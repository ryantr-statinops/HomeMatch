# Ledger và định giá

**Trạng thái:** contract mục tiêu; ledger cũ chưa cung cấp hành vi này.

## Dữ liệu và thứ tự

Portfolio thuộc một workspace/account, có `reporting_currency=USDT`. Tiền/quantity/price/fees truyền bằng chuỗi decimal, lưu numeric chính xác; không dùng floating-point cho sổ cái. Precision tối đa và rounding được khóa bằng schema P02; chỉ làm tròn số hiển thị, không làm tròn sau mỗi phép cộng nội bộ.

Ledger event gồm `event_id`, `portfolio_id`, `type`, `occurred_at` UTC, `sequence`, `instrument_id` khi cần, `quantity`, `price`, `fee_amount`, `fee_currency`, `source`, `external_id` tùy chọn và provenance. `sequence` tăng trong portfolio để phân biệt các event cùng timestamp. Replay theo `(occurred_at, sequence)`; chèn lùi thời gian phải tính lại toàn bộ phần đuôi và từ chối nếu tạo cash/quantity âm ở bất kỳ thời điểm nào.

Các loại event v1:

| Loại | Tác động |
|---|---|
| `cash_deposit` / `cash_withdrawal` | Tăng/giảm USDT, là external cashflow, không phải lợi nhuận |
| `buy` / `sell` | Thay đổi inventory và cash theo fill do user khai báo |
| `opening_position` | Khởi tạo quantity và tổng cost basis USDT tại đầu lịch sử |
| `asset_transfer_in` / `asset_transfer_out` | Chuyển tài sản với carry-over basis, không tạo realized P&L |

Cash đầu kỳ ghi bằng deposit có nhãn opening; position đầu kỳ yêu cầu cost basis do người dùng nhập. Không suy ra basis từ giá hiện tại. Transfer-in yêu cầu basis/provenance; transfer-out lấy basis theo average cost hiện tại. Không có basis thì từ chối nhập ledger v1 và yêu cầu người dùng bổ sung. Deposit/opening/transfer đều được tách khỏi trading P&L; báo cáo lợi nhuận theo phần lịch sử đã khai báo.

## Weighted-average cost và fees

Với quantity hiện có `Q`, cost basis `B`, average cost `A=B/Q` nếu `Q>0`:

- Buy `q` tại `p`, fee `f` USDT: cash giảm `q*p+f`; quantity mới `Q+q`; basis mới `B+q*p+f`.
- Sell `q<=Q`: cash tăng `q*p-f`; removed basis `q*A`; realized P&L tăng `q*p-f-q*A`; quantity/basis giảm tương ứng.
- Khi bán hết, quantity và basis được reset chính xác về zero. Reject sale vượt inventory và buy vượt cash; không auto-borrow hay short.
- Unrealized P&L = `Q*mark_price-B`. Trading P&L = realized + unrealized, đã gồm fees theo công thức; cashflows không được cộng vào chỉ số này.

Ví dụ: deposit 1.000 USDT; mua 2 unit tại 100, fee 2 → cash 798, basis 202, average 101. Bán 1 tại 120, fee 1 → cash 917, basis còn 101, realized P&L 18. Với mark 110: equity 1.027, unrealized P&L 9, trading P&L 27. Unit trong ví dụ chỉ minh họa phép tính.

V1 manual/CSV chỉ chấp nhận `fee_currency=USDT`; fee BTC, ETH, BNB hoặc currency khác bị reject rõ tại preview, kể cả có rate do người dùng cung cấp. Không tự áp rate hiện tại cho fee lịch sử. Adapter chuẩn hóa non-USDT fees được hoãn; thiết kế sau phải giữ raw amount/currency, conversion rate/time/source và kiểm tra không tính fee hai lần.

## Định giá và lịch sử

Mark của từng holding phải đúng venue/market/instrument, có `observed_at`, `source`, `price_kind` và freshness policy version. Backend lấy mark từ nguồn được duyệt và là nguồn định giá chuẩn cho portfolio API; không tin quote/mark do browser gửi. Quote WebSocket ở UI có thể phục vụ hiển thị tạm thời, không chứng minh fill hoặc ghi đè backend valuation. Khi source unavailable/stale, giữ last known mark với nhãn stale; nếu chưa có mark thì equity tổng không hoàn chỉnh và không coi holding bằng zero.

Equity = cash + tổng market value của holdings có giá. Equity history dùng giá lịch sử theo policy cố định, chỉ tin đã khả dụng tại mốc đó; không dùng quote hiện tại tô lại lịch sử. Ghi coverage và thiếu giá. MVP chưa công bố TWR/IRR hoặc return % khi cashflow/time coverage chưa đủ; P&L tuyệt đối và cashflows hiển thị riêng.

## Kịch bản nghiệm thu

- Nhiều lần mua/bán, bán hết rồi mua lại; fee bằng zero và fee vượt proceeds.
- Không âm cash/inventory; backdated event làm invalid phần đuôi bị từ chối nguyên tử.
- Deposit/withdraw/transfer không tạo trading profit; opening basis không bị giả định từ market price.
- Thiếu/stale quote, timestamp sai và giá venue khác không bị coi là định giá hợp lệ.
- Số decimal lớn/nhỏ và replay cùng ledger cho cùng kết quả ở API/UI.
