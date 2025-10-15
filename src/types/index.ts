export interface APIResponse {
    success: boolean,
    data: any,
    timestamp: Date,
    total?: number,
    limit?: number
}

export interface MarkgetInfo {
    app_count: {
        apps: number,
        atomic_services: number,
        total: number,
    }
    developer_count: number,
}

export type TopDownloadParams = {
    limit?: number,
    exclude_pattern?: string,
}

export interface TopDownloadApp {
    [0]: {
        app_id: string,
        icon_url?: string,
        name: string
    },
    [1]: {
        download_count: number
    }
}

export interface StarCharts {
    star_1: number,
    star_2: number,
    star_3: number,
    star_4: number,
    star_5: number
}

export type AppListParams = {
    page?: number,
    sort?: string,
    desc?: boolean,
    page_size?: number,
    search_key?: string,
    search_value?: string,
    search_exact?: boolean
}

export const defaultAppListParams: AppListParams = {
    page: 1,
    sort: 'download_count',
    desc: true,
    page_size: 20,
}

export interface AppListInfo {
    info: {
        app_id: string,
        comment?: {
            platform: string,
            user: string
        },
        created_at: string,
        icon_url: string,
        kind_name: string,
        kind_type_name: string,
        listed_at: string,
        name: string,
        developer_name: string,
    },
    metric: {
        created_at: string,
        download_count: number,
        size_bytes: number
    },
    rating?: {
        average_rating: number,
        created_at: string,
        total_star_rating_count: number,
    }
}

export interface AppList {
    total_count: number,
    data: AppListInfo[]
}

export interface AppDetail {
    get_data: boolean,
    info: {
        app_id: string,
        comment?: {
            platform: string,
            user: string
        },
        name: string,
        listed_at: string,
        created_at: string,
        description: string,
        icon_url: string,
        kind_name: string,
        developer_name: string,
        main_device_codes: string[],
        pkg_name: string,
        tag_name: string,
        kind_type_name: string,
    },
    metric: {
        created_at: string,
        download_count: number,
        size_bytes: number,
        version: string,
        target_sdk: number,
        minsdk: number,
        compile_sdk_version: number,
        release_date: number,
        version_code: number,
    },
    new_app: boolean,
    new_info: boolean,
    new_metric: boolean,
    new_rating: boolean,
    rating?: {
        average_rating: number,
        created_at: string,
        total_star_rating_count: number,
    }
}
export interface AppDetailMetric {
    
}

export interface SdkPie {
    /*
    * sdk 版本
    */
    [0]: number,
    /*
    * sdk 数量
    */
    [1]: number
}

export interface AppDetailPage {
    appInfo?: AppDetail,
    appMetric?: AppDetailMetric
}

export type BackendDateType = string | number;