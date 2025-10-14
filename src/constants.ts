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

export const responseTimestamp = ref<Date|null>();