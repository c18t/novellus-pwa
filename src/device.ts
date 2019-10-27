import uuidv4 from "uuid/v4";
import encoding from "encoding-japanese";

const _ReceiveDeviceResult : any[string] = [];
window.ReceiveDeviceResult = (uuid: string): string | null => {
  let data: string | undefined = _ReceiveDeviceResult[uuid];
  delete _ReceiveDeviceResult[uuid];
  return data == undefined ? null : data;
};

window.SetDeviceResult = (uuid: string, data: string) => {
  _ReceiveDeviceResult[uuid] = data;
}

var device: Device = {
  Alert: (message: string): void => {
    let uuid = uuidv4();
    window.Device_Alert(JSON.stringify({ uuid: uuid, message: message }));
    let data: string | null = null;
    let id: NodeJS.Timer | null = null;
    let count: number = 1000;
    id = setInterval(() => {
      if ((data = window.ReceiveDeviceResult(uuid)) != null) {
        clearInterval(id!);
      }
      else if (--count <= 0) {
        clearInterval(id!);
      }
    }, 10);
  },
  Time: (): Promise<string> => {
    let uuid = uuidv4();
    window.Device_Time(JSON.stringify({ uuid: uuid }));
    return new Promise<string>((resolve: (data: string) => void, reject: (reason?: any) => void) => {
      let data: string | null = null;
      let id: NodeJS.Timer | null = null;
      let count: number = 1000;
      id = setInterval(() => {
        if ((data = window.ReceiveDeviceResult(uuid)) != null) {
          clearInterval(id!);
          resolve(data);
        }
        else if (--count <= 0) {
          clearInterval(id!);
          reject();
        }
      }, 10);
    })
  },
  Fetch: (url: string): Promise<string> => {
    let uuid = uuidv4();
    window.Device_Fetch(JSON.stringify({ uuid: uuid, url: url }));
    return new Promise<string>((resolve: (data: string) => void, reject: (reason?: any) => void) => {
      let data: string | null = null;
      let id: NodeJS.Timer | null = null;
      let count: number = 1000;
      id = setInterval(() => {
        if ((data = window.ReceiveDeviceResult(uuid)) != null) {
          clearInterval(id!);
          resolve(data);
        }
        else if (--count <= 0) {
          clearInterval(id!);
          reject();
        }
      }, 10);
    })
  }
}

if (typeof window.Device_Time != "function") {
  window.Device_Time = (json: string) => {
    let req = JSON.parse(json);
    window.SetDeviceResult(req["uuid"], JSON.stringify({ time: "hogefuga" }));
  }
}
if (typeof window.Device_Alert != "function") {
  window.Device_Alert = (json: string) => {
    let req = JSON.parse(json);
    window.SetDeviceResult(req["uuid"], JSON.stringify({}));
    alert(req.message);
  }
}
if (typeof window.Device_Fetch != "function") {
  window.Device_Fetch = (json: string) => {
    let req = JSON.parse(json);
    const content = "s にソースを、 q に何%環礁聴ケ環繊覧シ謄ポンするかを指定してね\no を指定す額る類騒額とケシ趣輩ポ選趣ン晴で替棋摘上暦歌書廊復き慌す額る類騒額よ\na を指定提握敢す掌るとアスキー文字(半叡角蕗橘の英塗数嫁記号だよ)はケシポ憧熙ン諄憧しないよ\np に堪塔文堪壇字壌凝列験燿を雛験騎指定すると臆好壕螺きな文字でケシポンで廊復き慌る鎖額よ翻鎖\n\nl 験燿を雛験騎指定す額る類騒額と順番にケシ趣輩ポ選趣ン堪塔文堪字を使尋う帽よ\nr を指定するとラン緩締ダ舗ムにケ繊覧シ謄ポン文字を使う鎖額よ翻鎖\nl も r 臨も覆難指定しないと謝ソ購ースの文字愉ご扉とに決まった閑順随隊番でケシポン文壇字壌凝を使う鎖額よ翻鎖\n\n膚デ蔵ータはUTF-8で送って朝棒棚ね最棚\n\n詳しくはこちら → http://github.com/c18t/keshipon/tree/master\n";
    window.SetDeviceResult(req["uuid"], JSON.stringify({ content: encoding.base64Encode(encoding.convert(content, { from: "UNICODE", to: "SJIS" }) as number[]) }));
  }
}

export default device = device;