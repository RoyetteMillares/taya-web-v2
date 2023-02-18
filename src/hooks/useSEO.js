import { useRouter } from "vue-router";
import { effect } from "vue";
import { metaIndex } from "./meta.js";
import { metaSports } from "./meta.js";
import { metaHelpCenter } from "./meta.js";


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
     if (router.currentRoute.value.name === "helpCenter") {
       metaHelpCenter.forEach((meta) => {
         const element = createMetaElement(meta);
         head.insertBefore(element, head.firstChild);
       });
     }
  });
}
