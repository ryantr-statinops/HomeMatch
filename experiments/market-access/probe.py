import datetime,json,pathlib,urllib.request,urllib.error,sys

def main():
    if "--allow-network" not in sys.argv:
        raise SystemExit("Opt-in only: python experiments/market-access/probe.py --allow-network")
    results=[]
    base='https://data-api.binance.vision'
    for symbol in ['BTCUSDT','ETHUSDT']:
        for interval in ['15m','1h','1d']:
            url=base+'/api/v3/klines?symbol='+symbol+'&interval='+interval+'&limit=3'
            record={'symbol':symbol,'interval':interval,'endpoint':url,'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'environment':'coordinator-shell; not deployed browser','access_test_only':True,'rights_confirmed':False}
            try:
                with urllib.request.urlopen(url,timeout=15) as res:
                    rows=json.load(res);record['http_status']=res.status
                    assert isinstance(rows,list) and len(rows)==3 and all(isinstance(r,list) and len(r)==12 for r in rows)
                    now_ms=int(datetime.datetime.now(datetime.timezone.utc).timestamp()*1000)
                    record.update({'rows':len(rows),'timestamp_unit':'milliseconds by default REST contract','strictly_increasing_open_times':all(rows[i][0]<rows[i+1][0] for i in range(len(rows)-1)),'closed_rows_at_check':sum(r[6]<now_ms for r in rows),'raw_data_persisted':False})
            except urllib.error.HTTPError as exc:record.update({'http_status':exc.code,'error':'HTTP response; no proxy fallback attempted'})
            except Exception as exc:record.update({'error_type':type(exc).__name__,'error':'Network/schema validation failed; no proxy fallback attempted'})
            results.append(record)
    out=pathlib.Path('task/research-terminal-plan/evidence/p02-binance-rest-probe.json');out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(results,indent=2))

if __name__ == "__main__":
    main()
