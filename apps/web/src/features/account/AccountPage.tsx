import Container from "../../components/layout/Container";

export function AccountPage() {
  return (
    <Container className="py-8 sm:py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Tài khoản</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Managed auth, workspace switch và settings sẽ được triển khai sau. Hiện chỉ là placeholder.
      </p>
      <div className="panel mt-6">
        <h2 className="text-lg font-semibold">Chế độ demo</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Public demo là workspace mẫu chỉ đọc/replay, ghi rõ synthetic. Không dùng profile thật làm demo.
        </p>
      </div>
    </Container>
  );
}
