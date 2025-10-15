import { got } from "../constants";
import type { APIResponse, AppDetail, AppDetailMetric, AppList, AppListParams, MarkgetInfo, SdkPie, StarCharts, TopDownloadApp, TopDownloadParams } from "../types";
import { defaultAppListParams } from "../types"

export async function markgetInfo() {
    let data = await (await got.get("market_info")).json() as APIResponse
    return data.data as MarkgetInfo
}

async function topDownload(
    params?: TopDownloadParams
) {
    let data = await (await got.get("rankings/top-downloads", {
        searchParams: {
            ...{
                limit: 30,
                
            },
            ...params
        }
    })).json() as APIResponse
    return data.data as TopDownloadApp[]
}

export async function topDownloadHuawei() {
    return await topDownload()
}

export async function topDownloadWithoutHuawei() {
    return await topDownload({
        limit: 30,
        exclude_pattern: 'huawei'
    })
}

export async function starCharts() {
    let data = await (await got.get("charts/rating")).json() as APIResponse
    return data.data as StarCharts
}

export async function fetchAppList(params?: AppListParams) {
    let merged = {
        ...defaultAppListParams,
        ...params || {},
    };
    // pop merged page
    let page = merged.page || 1;
    delete merged.page;
    let data = await (await got.get(`apps/list/${page}`, {
        searchParams: merged
    }))
    let resp = await data.json() as APIResponse
    return resp.data as AppList
}

export async function fetchAppDetail(appId: string) {
    let data = await (await got.get(`apps/app_id/${appId}`)).json() as APIResponse
    return data.data as AppDetail
}

export async function fetchAppMetric(appPackage: string) {
    let data = await (await got.get(`apps/metrics/${appPackage}`)).json() as APIResponse
    return data.data as AppDetailMetric
}

export async function fetchMinSdkPie() {
    let data = await (await got.get(`charts/min_sdk`)).json() as APIResponse
    return data.data as SdkPie[]
}

export async function fetchTargetSdkPie() {
    let data = await (await got.get(`charts/target_sdk`)).json() as APIResponse
    return data.data as SdkPie[]
}