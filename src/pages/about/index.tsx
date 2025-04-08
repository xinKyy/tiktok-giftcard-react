import Header from "../../components/Header";
import React, {useEffect, useState} from "react";
import styles from "./index.module.scss"



const aboutBodyContent = [
  {
    id:"1",
    title:"会社概要",
    content:<>
      <div className={styles.ques_wrap}>
        <div className={styles.left}>会社名</div>
        <div>NEXTLAND HONGKONG LIMITED</div>
      </div>
      <div className={styles.ques_wrap}>
        <div className={styles.left}>所在地</div>
        <div>MANULIFE PLACE 348 KWUN TONG ROAD KL</div>
      </div>
      <div className={styles.ques_wrap}>
        <div className={styles.left}>事業内容</div>
        <div>Tik Tok ギフトカードの販売事業</div>
      </div>
      <div className={styles.ques_wrap}>
        <div className={styles.left}>お問い合わせ</div>
        <div>Contact@nextlandhk.com</div>
      </div>
    </>,
  },
  {
    id:"2",
    title:"お問い合わせ",
    content:<>
      Email：<a style={{
      textDecoration:"underline",
      cursor:"pointer",
    }} href={"mailto:contact@nextlandhk.com"} target={"_blank"}>
      <span >contact@nextlandhk.com</span>
    </a>
    </>,
  },
  {
    id:"3",
    title:"返品・返金ポリシー",
    content:<>
      商品の特性上、返品・交換はお受けできません。<br/>
      初期不良・商品違いの場合は、商品到着後24時間以内にご連絡ください。
    </>,
  },
  {
    id:"4",
    title:"特定商取引法に基づく表示",
    content:<>
      <strong>販売事業者</strong><br/>
      NEXTLAND HONGKONG LIMITED<br/><br/>
      <strong>運営責任者</strong><br/>
      NEXTLAND HONGKONG LIMITED<br/><br/>
      <strong>所在地</strong><br/>
      MANULIFE PLACE 348 KWUN TONG ROAD<br/><br/>
      <strong>電話番号</strong><br/>
      <strong>メールアドレス</strong><br/>
      Contact@nextlandhk.com<br/><br/>
      <strong>販売URL</strong><br/>
      <a href={"https://www.ttgiftcard.com"}>www.ttgiftcard.com</a><br/><br/>
      <strong>販売価格</strong><br/>
      各商品ページに記載<br/><br/>
      <strong>商品代金以外の必要料金</strong><br/>
      ギフトカードの販売価格には消費税は含まれていません（非課税）<br/><br/>
      <strong>支払方法</strong><br/>
      クレジットカード決済<br/><br/>
      <strong>支払時期</strong><br/>
      クレジットカード決済：ご注文時<br/><br/>
      <strong>返品・交換・キャンセルについて</strong><br/>
      商品の特性上、返品・交換はお受けできません。<br/>
      初期不良・商品違いの場合は、商品到着後２４時間以内にご連絡ください。<br/>
      お客様都合による返品・交換は受け付けておりません。<br/>
    </>,
  },
  {
    id:"5",
    title:"利用規約（ギフトカード販売用）",
    content:<>
      <strong>概要</strong><br/>
      本ウェブサイトは「www.ttgiftcard.com」によって運営されています。サイト全体を通じて、「当社」、「私たち」、「当社の」という用語は「www.ttgiftcard.com」を指します。当社は、本ウェブサイト上のギフトカードの販売およびそれに関連するすべての情報、ツール、サービス（以下「サービス」）を、ここに記載されたすべての規約、条件、ポリシーおよび通知（以下「利用規約」）を受け入れることを条件に提供します。
      当社からギフトカードを購入、または当社サイトにアクセスすることで、あなたは本利用規約および関連ポリシーに拘束されることに同意したものとみなされます。利用者がこれらの規約のすべてに同意しない場合、当社のサービスを利用することはできません。
      <br/>
      <br/>

      <strong>セクション1 - 購入資格 </strong><br/>
      本サイトでギフトカードを購入するには、居住国の法定成人年齢に達している必要があります。未成年者は、親権者または法定代理人の同意がある場合に限りサービスを利用できます。違法目的でのギフトカードの使用は禁止されており、すべての関連法規に従う必要があります。
      <br/>
      <br/>

      <strong>セクション2 - 一般条件 </strong><br/>
      当社は、理由の如何を問わず、誰に対してもサービスの提供を拒否する権利を留保します。サイトのいかなる部分も、当社の明示的な書面による許可なく複製、コピー、販売、再販または悪用することを禁止します。
      <br/>
      <br/>

      <strong>セクション3 - 情報の正確性 </strong><br/>
      本サイトの情報は一般的な参考情報を目的として提供されており、最新性、正確性、完全性を保証するものではありません。利用者は自己の判断と責任で情報を使用するものとします。
      <br/>
      <br/>

      <strong>セクション4 - サービスおよび価格の変更 </strong><br/>
      ギフトカードの価格および内容は予告なく変更される場合があります。サービスの変更、中断または終了に関して当社は一切の責任を負いません。
      <br/>
      <br/>

      <strong>セクション5 - 商品および返品 </strong><br/>
      ギフトカードはデジタル形式で提供され、原則として返品・交換は受け付けておりません。ただし、当社のシステム上の不具合等により利用できない場合、個別に対応いたします。お客様都合による返金は受け付けておらず、法令により必要な場合を除いて返金・返品・交換は不可です。
      <br/>
      <br/>

      <strong>セクション6 - 決済およびアカウント情報 </strong><br/>
      購入時には正確な決済情報（クレジットカード、メールアドレス等）を提供していただきます。当社は、不正注文または不審な取引に対して注文を拒否・キャンセルする権利を有します。
      <br/>
      <br/>

      <strong>セクション7 - ライセンスおよび制限 </strong><br/>
      本サイトおよび提供されるギフトカードは、個人使用を目的としており、転売または商業利用を目的とした購入は禁止されています。
      <br/>
      <br/>

      <strong>セクション8 - 禁止事項 </strong><br/>
      本サイトまたはサービスの利用にあたり、以下の行為は禁止されます：
      <ul style={{marginLeft:30}}>
        <li>TikTok.com以外での利用</li>
        <li>無許可の広告・宣伝活動</li>
        <li>TikTokのポリシー等で禁止された方法での利用</li>
        <li>詐欺的または違法な取引</li>
        <li>不正アクセス、またはセキュリティシステムの回避</li>
        <li>当社または他者への誹謗中傷、または権利侵害</li>
      </ul>
      <br/>
      <br/>

      <strong>セクション9 - 保証の免責および責任制限 </strong><br/>
      ギフトカードおよび本サービスは「現状有姿」で提供されます。当社は商品性や特定目的適合性の黙示保証を一切行いません。利用者が被ったいかなる損害についても、当社は一切の責任を負いません。
      <br/>
      <br/>

      <strong>セクション10 - 有効期限 </strong><br/>
      ギフトカードの有効期限は、有効化された日から1年間です。
      <br/>
      <br/>

      <strong>セクション11 - その他の条件</strong><br/>
      <ul style={{marginLeft:30}}>
        <li>満18歳以上の方のみ利用可能です。</li>
        <li>日本国内のみで利用可能です。</li>
        <li>1日または1ヶ月あたりのコインのチャージ上限額が設定される場合があります。</li>
        <li>詳細は TikTok公式ページ（https://www.tiktok.com/coin/legal/gift-card-policy）をご確認ください。</li>
      </ul>
      <br/>
      <br/>

      <strong>セクション12 - 準拠法および裁判管轄 </strong><br/>
      本利用規約は香港の法律に準拠し、すべての紛争は香港の裁判所の専属的管轄に服します。
      <br/>
      <br/>

      <strong>セクション13 - 変更および通知</strong><br/>
      本利用規約は予告なく変更される場合があります。最新の利用規約は本ページにて確認可能です。
      <br/>
      <br/>


      <strong>セクション14 - お問い合わせ </strong><br/>
      本利用規約に関するご質問は、「contact@nextlandhk.com」宛にお問い合わせください。
      <br/>
      <br/>

      <strong>NEXTLAND HONGKONG LIMITED 6/F MANULIFE PLACE, 348 KWUN TONG ROAD </strong><br/>
      ビジネス識別番号：3102976
      <br/>
      <br/>
    </>,
  },
  {
    id:"6",
    title:"プライバシーポリシー（ギフトカード用）",
    content:<>
      <strong>プライバシー声明 </strong><br/>
      当社は、お客様のプライバシー保護を最重要視しており、このプライバシーポリシーでは、当社がギフトカードの販売および提供に関連してどのように個人情報を収集、使用、共有、処理するかを説明します。
      <br/>
      <br/>
      <div style={{marginLeft:30}}>
        <strong>1.個人情報の収集 当社は以下の方法で個人情報を収集します：</strong><br/>
        <ul style={{marginLeft:20}}>
          <li>購入時に提供される氏名、メールアドレス、請求先・配送先住所、支払い情報（クレジットカード番号等）</li>
          <li>ウェブサイトの利用に伴って生成される情報（IPアドレス、ブラウザ情報、アクセス日時、使用端末情報など）</li>
        </ul>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>2.利用目的 収集した個人情報は以下の目的で利用します：</strong><br/>
        <ul style={{marginLeft:20}}>
          <li>ギフトカードの販売および提供、決済処理、カスタマーサポート対応</li>
          <li>利用者本人確認、アカウント管理、不正取引・詐欺防止のため</li>
          <li>サイト改善、マーケティング、サービスのパーソナライズ（同意がある場合）</li>
        </ul>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>3.クッキーの使用 当社ウェブサイトでは、クッキーを使用し、ユーザーの操作履歴、設定情報等を記録・分析します。これにより、利便性の向上やサービス改善を行います。ブラウザの設定によりクッキーの拒否が可能ですが、機能が制限される場合があります。</strong><br/>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>4.第三者との情報共有 以下の場合に限り、個人情報を第三者と共有することがあります：</strong><br/>
        <ul style={{marginLeft:20}}>
          <li>決済処理、配送、システム提供など業務委託先との連携が必要な場合</li>
          <li>法令に基づく開示要請がある場合</li>
          <li>不正防止や法的対応のために必要と判断される場合</li>
        </ul>
        第三者が提供するTikTokプラットフォームでのギフトカード利用に関しては、TikTok社のプライバシーポリシー（https://www.tiktok.com/legal/page/jp/privacy-policy/ja）もご確認ください。
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>5.保管期間 個人情報は、利用目的に必要な期間保持し、その後は安全に削除または匿名化処理を行います。</strong><br/>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>6.情報の管理と安全対策 当社は、個人情報の漏洩、滅失、毀損等を防止するため、適切な技術的および組織的な安全管理措置を講じます。</strong><br/>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>7.未成年者の利用 当社のギフトカードサービスは、18歳以上の方を対象としています。18歳未満の方の個人情報を意図的に収集することはありません。</strong><br/>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>8.お客様の権利 お客様はご自身の個人情報に関し、開示、訂正、削除、利用停止を求める権利があります。ご希望の場合は、本ポリシー末尾の「お問い合わせ」先までご連絡ください。</strong><br/>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>9.プライバシーポリシーの変更 当社は本ポリシーを随時更新することがあります。重要な変更がある場合は、当サイト上で周知いたします。</strong><br/>
        <br/>
        <br/>
      </div>

      <div style={{marginLeft:30}}>
        <strong>10.お問い合わせ 本プライバシーポリシーに関するご質問は、「contact@nextlandhk.com」宛にご連絡ください。</strong><br/>
        <br/>
        <br/>
      </div>

    </>,
  },
]



const About = () =>{
  const [id, setId] = useState<number>();
  const getIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); // 获取 ?id=2 中的 2
  };

  const scrollToSection = () => {
    const id = getIdFromURL();
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block:"center" });
      }
    }
  };

  useEffect(()=>{
    const nid = getIdFromURL();
    if (nid) {
      setId(Number(nid))
    }
  }, [])

  const render = () =>{
    if(!id) return;
    const json = aboutBodyContent[id - 1]
    return <>
      <div className={styles.title}>{json.title}</div>
      <div className={styles.des}>
        {json.content}
      </div>
    </>

  }

  return <div>
    <Header></Header>
    <div className={styles.about_page}>
      <div className={styles.body_wrap}>
        {
          render()
        }
      </div>
    </div>
  </div>
}

export default About
