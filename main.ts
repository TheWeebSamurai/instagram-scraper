import puppeteer from "puppeteer";
// import { StringLiteral } from "typescript";
import express from 'express'
import type {Request, Response} from 'express' 
import { JSONFilePreset } from 'lowdb/node'
const cooldowns = new Map()
const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes

const app = express()

const captionClass = "x1lliihq x1plvlek xryxfnj x1n2onr6 xyejjpt x15dsfln x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xvs91rp xo1l8bm x9bdzbf x10wh9bi xpm28yp x8viiok x1o7cslx"
const viewClass = "html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs"


app.use(express.json())

  function normalizeProfileUrl(url: string) {
  let u = url;

  u = u.split("?")[0];        // remove ?igsh=...
  u = u.replace(/\/$/, "");   // remove trailing slash
  u = u.replace(/^https?:\/\//, ""); // remove protocol
  u = u.replace(/^www\./, "");       // remove www
  u = u.toLowerCase();               // case-insensitive

  return "https://" + u;
}


interface instagramMetadata {
    reelUrl: string;
    views: string;
    likes: string;
    caption: string;
    shares: string;
    comments: string;
    reel_url_for_views: string;
}

interface DBData {
    watch_list : instagramMetadata[]
}

let defaultData : DBData = {
    watch_list : []
}
const db = await JSONFilePreset('db.json', defaultData)

async function  getFirstReelData(reelUrl: string) : Promise<instagramMetadata> {
    
function extractReelId(url: string,) {
  const match = url.match(/\/reel\/([A-Za-z0-9_-]+)\//);
  return match ? match[1] : null;
}


    let data : instagramMetadata = {
        reelUrl: "",
        views: "",
        likes: "",
        caption: "",
        shares: "",
        comments: "",
        reel_url_for_views: ""
    };
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: "./my-profile",   // this will save cookies
  });
  const page = await browser.newPage();
//   data.reel_url_for_views = `${reelUrl}/reels`



  await page.goto(`${normalizeProfileUrl(reelUrl)}/reels/`, {
    waitUntil: "networkidle2",
  });
  data.reel_url_for_views = `${normalizeProfileUrl(reelUrl)}/reels`;
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

            return data;
             
        } catch (err) {
            console.log(err)
        }
    } catch (error) {
        console.log(error)
    }
  } catch (err) {
    console.log("ERROR:", err);
  } finally {

    await browser.close().catch(() => {});
  }

  return data;
}


app.post('/getData', async(req: Request, res: Response) => {
    const {url, pass} = req.body
    console.log(url)
         if(pass !== "testing@123") return res.status(401).json({message: "Unauthorized"})
       if(cooldowns.has(normalizeProfileUrl(url))) {
        const cooldown = cooldowns.get(normalizeProfileUrl(url))
        if(Date.now() < cooldown.expires) {
            console.log("Returning cached data")
            await db.read()
            let cachedData = await db.data.watch_list.find(item => item.reel_url_for_views === `${normalizeProfileUrl(url)}/reels`)
             return res.status(200).json({ data: cachedData, cached: true });
        }
       }
    // let pass = data.pass
    // let url = data.url
      console.log("Fetching fresh data...");
    const urlData = await getFirstReelData(url);
   


    const existingIndex = db.data.watch_list.findIndex(
        item => item.reel_url_for_views === urlData.reel_url_for_views
    );
    if (existingIndex >= 0) {
        db.data.watch_list[existingIndex] = urlData;
    } else {
        db.data.watch_list.push(urlData);
    }

    cooldowns.set(normalizeProfileUrl(url), {
        expires: Date.now() + CACHE_DURATION,
        data: urlData
    })
    return await res.status(200).json({data: urlData})

 


})

setInterval(() => {
  const now = Date.now();
  for (const [url, entry] of cooldowns) {
    if (now > entry.expires) cooldowns.delete(url);
  }
}, 60 * 1000);

setInterval( async () => {
    for (const [url, entry] of cooldowns) {
        if(Date.now() > entry.expires) {
            const data = await getFirstReelData(url)
            cooldowns.set(normalizeProfileUrl(url), {
                expires: Date.now() + CACHE_DURATION,
                data
            })
        }
    }
}, 5 * 60 * 1000)


app.post('/checkForCode', async(req:Request, res: Response) => {
    const {pass, url, code} = req.body
    if(pass !== "not the actual password Lmfao I need to upload it to github@217318237") return res.json({message: "Auth Failed!"})
    let check = await db.data.watch_list.find(item => item.reel_url_for_views === `${normalizeProfileUrl(url)}/reels`)
    if(check) {
        if (check.caption.includes(code)) {
            return res.json({success: true, data: check, containsCode: true})
        }else {
            return res.json({success: true, containsCode: false, data: check})
        }
    } else {
        let check = await getFirstReelData(normalizeProfileUrl(url))
        if(check) {
            if(check.caption.includes(code)) {
                return res.json({success: true, data: check, containsCode: true})
            } else {
                return res.json({success: true, containsCode:false, data: check})
            }
        }
    }
    
})




app.listen(5000, () => {
    console.log("Listening to port 5000")
})