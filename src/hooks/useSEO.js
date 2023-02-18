import { useRouter } from "vue-router";
import { effect } from "vue";
import { metaIndex } from "./meta.js";
import { metaSports } from "./meta.js";

const nameMap = {
  index: "Taya",
  sports: "Taya - Sports",
  about: "About - Page",
  liveChat: "LiveChat - Page",
  helpCenter: "Help Center Page",
  helpDetail: "Help Detail",
  commissionRules: "Commission Rules",
  blog: "Blog - Page",
  blogDetails: "Blog - Details",
  searchData: "Search Data",
  promote: "Promote",
  promoteDetail: "Promo Details",
  affiliate: "Affiliate",
  vip: "Vip",
  casino: "Casino",
  live: "Live",
  slots: "Slots",
  turbo: "Turbo",
  cockfight: "Cockfight",
  fishing: "Fishing",
  gameRoom: "Game Room",
};


//Remove all the meta tags in the head tag
const RemoveMetaTag = () => {
  const metas = Array.from(document.head.children).filter(
   (el) => el.nodeName === "META"
 );
  metas.forEach((el) => el.remove());
}
//Create a dynamic meta tags
 const createMetaElement = (attributes) => {
   const element = document.createElement("meta");
   for (const key in attributes) {
     element.setAttribute(key, attributes[key]);
   }
   return element;
 };

export default function useSEO() {
  const router = useRouter();
  console.log(router.currentRoute.value.matched)
  effect(() => {
    RemoveMetaTag();
    // create meta tags and append to head
    const head = document.getElementsByTagName("head")[0];

    if (router.currentRoute.value.name === "index") {
       metaIndex.forEach((meta) => {
         const element = createMetaElement(meta);
         head.insertBefore(element, head.firstChild);
       });
    }

    if (router.currentRoute.value.name === "sports") {
      metaSports.forEach((meta) => {
        const element = createMetaElement(meta);
        head.insertBefore(element, head.firstChild);
      });
    }

   
    document.title = nameMap[router.currentRoute.value.name];
    /*Prepare here the condition for the urls*/
  });
}
