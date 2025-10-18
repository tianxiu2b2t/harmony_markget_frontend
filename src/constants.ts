import ky from "ky";
import { ref } from "vue";
import type { APIResponse } from "./types";

export const got = ky.extend({
    prefixUrl: window.location.origin + "/api/",
    hooks: {
        afterResponse: [
            async (_, __, response) => {
                let data = await response.json() as APIResponse;
                console.log(data)
                responseTimestamp.value = new Date(data.timestamp);
            }
        ]
    }
})

export const responseTimestamp = ref<Date | null>();
export const darkMode = ref(false);
export const repo = "https://github.com/shenjackyuanjie/get_harmony_markget";

(() => {
    var observer = new MutationObserver(() => {
        darkMode.value = document.documentElement.classList.contains("dark");
        localStorage.setItem("darkMode", darkMode.value.toString());
    })
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
    })
    darkMode.value = document.documentElement.classList.contains("dark");
    localStorage.setItem("darkMode", darkMode.value.toString());
})()