export type WebhookTransport = {
    method: 'webhook'
    callback: string
    secret?: string
}


export type Subscription<
    T extends string,
    V extends string,
    C extends object,
> = {
    type: T
    version: V
    id: string
    condition: C
    status: string
    transport: WebhookTransport
    created_at: string
}
