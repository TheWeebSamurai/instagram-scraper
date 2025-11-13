import puppeteer from "puppeteer";
// import { StringLiteral } from "typescript";


const captionClass = "x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x9bdzbf x10wh9bi xpm28yp x8viiok x1o7cslx"
const viewClass = "html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs"

interface instagramMetadata {
    reelUrl: string;
    views: string;
    likes: string;
    caption: string;
    shares: string;
    comments: string;
}



function extractReelId(url: string) {
  const match = url.match(/\/reel\/([A-Za-z0-9_-]+)\//);
  return match ? match[1] : null;
}


(async () => {
    let data : instagramMetadata = {
        reelUrl: "",
        views: "",
        likes: "",
        caption: "",
        shares: "",
        comments: ""
    };
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./my-profile",   // this will save cookies
  });

  const page = await browser.newPage();

  let reelUrl = "https://www.instagram.com/leomessi"

  await page.goto(`${reelUrl}/reels/`, {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(".xg7h5cd.x1n2onr6");


  await new Promise(res => setTimeout(res, 1500));

  try {

  const dotUrl = ".html-div.xdj266r.x14z9mp.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x1yztbdb.xyqm7xq.x10l6tqk.x1ey2m1c.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1 span";

const views = await page.$$eval(dotUrl, spans =>
  spans.map(s => s.textContent.trim())
);

    console.log(views);
    data.views = views[0]


    
    const hrefs = await page.$$eval(".xg7h5cd.x1n2onr6 a", (anchors) =>
      anchors.map((a) => a.href)
    );

    console.log("FOUND LINKS:", hrefs);
    const finalUrls = hrefs.map(url => extractReelId(url))
    console.log(finalUrls)

    const firstLink = `https://instagram.com/reels/${finalUrls[0]}`
        data.reelUrl = firstLink
    try {
        await page.goto(firstLink, {waitUntil:"networkidle2"})
        const descUri = ".x1g9anri.x78zum5.xvs91rp.xmix8c7.xd4r4e8.x6ikm8r.x10wlt62.x1i0vuye span"
        const desc = await page.$$eval(descUri, (spans) =>
        spans.map(s => s.textContent.trim())
        )
        console.log(desc)
        data.caption = desc[0]

        try {
             const linkClas = `.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.xyejjpt.x15dsfln.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.x1fhwpqd.xo1l8bm.x5n08af.x10wh9bi.xpm28yp.x8viiok.x1o7cslx span`
            const linkData = await page.$$eval(linkClas, (spans) => 
            spans.map(s => s.textContent.trim())
            
        )
            console.log(linkData)
            data.likes = linkData[0]
            data.comments = linkData[1]


            console.log(data)
             
        } catch (err) {
            console.log(err)
        }
    } catch (error) {
        console.log(error)
    }
  } catch (err) {
    console.log("ERROR:", err);
  }


})();

