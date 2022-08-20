export interface DfWebhookTextResponse {
  fulfillmentMessages: FulfillmentMessage[];
}

export interface FulfillmentMessage {
  text: Text;
}

export interface Text {
  text: string[];
}
