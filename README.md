Handson Material (BLE key lock secirity application)
====

# Overview

## Description

このアプリケーションはWeb Bluetooth APIを使ったBLEアプリケーションのサンプルです。
自作のBLEデバイスと接続し、鍵の開け閉めの状態を確認できます。また、アラームをセットしている状態で鍵を開けると
BLEデバイスにつけたブザーがなるようになっています。

## For Device
デバイスにはホール素子とブザーが付いています。BLEのサービスとキャラクタリスティックは以下のように設定されます。
　
* サービス　
    * UUID 123456789012345678901234567890FF
    * 鍵開閉のキャラクタリスティック 
        * UUID 12345678901234567890123456789011
        * Mode Read,Notify
        * Length 1byte(0x02の場合ロック,0x00の場合アンロック)
    * ブザーのキャラクタリスティック
        * UUID 12345678901234567890123456789022
        * Mode Write(応答なし)
        * Length 1byte(0x04の場合に発音,0x00の場合に消音)

このデバイスはMicrochip社のRN4020を使って簡単に作ることができます。また、必要なコマンドはscriptフォルダに入っています。



## Licence

[MIT LICENCE](https://github.com/masato-ka/geo-hash-potate/blob/master/LICENSE.txt)


## Author

[masato-ka](https://twitter.com/masato_ka)

Last modify : Sep/30/2017