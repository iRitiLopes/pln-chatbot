export interface DfWebhookImageResponse {
  fulfillmentMessages: FulfillmentMessage[];
}

export interface FulfillmentMessage {
  payload: Payload;
}

export interface Payload {
  richContent?: RichContent[][];
}

export interface Text {
  text: string[];
}

export interface RichContent {
  type: 'image';
  rawUrl: string;
  accessibilityText: string;
}
