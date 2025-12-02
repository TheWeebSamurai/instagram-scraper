// // THIS IS A BUNCH OF AI GENERATED SPAGHETTI CODE 
// import puppeteer from "puppeteer";

// class InstagramScraper {
//     user_name: string;

//     constructor(user_name: string) {
//         this.user_name = user_name;
//     }

//     async _getPublicData() {
//         const browser = await puppeteer.launch({
//             headless: false,
//             // userDataDir: "./my-profile"
//         });

//         const page = await browser.newPage();
//         await page.goto(`https://instagram.com/${this.user_name}`, { waitUntil: "networkidle2" });
//         const popupClose = 'svg[aria-label="Close"]';

//         if (await page.$(popupClose)) {
//             await page.click(popupClose);
//             await page.waitForFunction(() => false, { timeout: 500 });
//         }

//         const parentSelector =
//         ".html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x40hh3e.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1";

//         await page.waitForSelector(parentSelector);


//         const numberSelector =
//         ".xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x1hl2dhg.x16tdsg8.x1vvkbs";
//         const numbers = await page.$$eval(
//             `${parentSelector} ${numberSelector}`,
//             spans => spans.map(s => s.textContent.trim())
//         );

//         const posts = numbers[0];
//         const followers = numbers[1];
//         const following = numbers[2];

//         console.log("RESULT:", { posts, followers, following });

//         await browser.close();

//         return {
//             user_name: this.user_name,
//             follower_count: followers,
//             following_count: following,
//             total_videos: posts,
//             display_name: this.user_name
//         };
//     }

//     async getData() {
//         return await this._getPublicData();
//     }
// }

// let insta = new InstagramScraper("theotakusamurai");
// console.log(await insta.getData());



import puppeteer from "puppeteer";

class InstagramScraper {
    user_name: string;

    constructor(user_name: string) {
        this.user_name = user_name;
    }

    async _getPublicData() {
        const browser = await puppeteer.launch({
            headless: false,
            // userDataDir: "./my-profile"
        });

        const page = await browser.newPage();
        await page.goto(`https://instagram.com/${this.user_name}`, { waitUntil: "networkidle2" });



        const parentSelector =
        ".html-div.xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x9f619.xjbqb8w.x40hh3e.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1";

        await page.waitForSelector(parentSelector);

        const numberSelector =
        ".xdj266r.x14z9mp.xat24cr.x1lziwak.xexx8yu.xyri2b.x18d9i69.x1c1uobl.x1hl2dhg.x16tdsg8.x1vvkbs";

        // NEW: Extract only the numbers inside the parent container
        const numbers = await page.$$eval(
            `${parentSelector} ${numberSelector}`,
            spans => spans.map(s => s.textContent.trim())
        );

        const posts = numbers[0];
        const followers = numbers[1];
        const following = numbers[2];

        console.log("RESULT:", { posts, followers, following });

        await browser.close();

        return {
            user_name: this.user_name,
            follower_count: followers,
            following_count: following,
            total_videos: posts,
            display_name: this.user_name
        };
    }

    async getData() {
        return await this._getPublicData();
    }
}

let insta = new InstagramScraper("theotakusamurai");
console.log(await insta.getData());
