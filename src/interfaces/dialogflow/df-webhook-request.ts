export interface DfWebhookRequest {
  alternativeQueryResults: AlternativeQueryResult[];
  originalDetectIntentRequest: OriginalDetectIntentRequest;
  queryResult: QueryResult;
  responseId: string;
  session: string;
}

export interface AlternativeQueryResult {
  languageCode: string;
  queryText: string;
  sentimentAnalysisResult: SentimentAnalysisResult;
}

export interface SentimentAnalysisResult {
  queryTextSentiment: QueryTextSentiment;
}

export interface QueryTextSentiment {
  magnitude: number;
  score: number;
}

export interface OriginalDetectIntentRequest {
  payload: Payload;
  source: string;
}

export interface Payload {
  pokemonName;
}

export interface QueryResult {
  allRequiredParamsPresent: boolean;
  fulfillmentMessages: FulfillmentMessage[];
  intent: Intent;
  intentDetectionConfidence: number;
  languageCode: string;
  outputContexts: OutputContext[];
  parameters: Payload;
  queryText: string;
  sentimentAnalysisResult: SentimentAnalysisResult;
}

export interface FulfillmentMessage {
  text: Text;
}

export interface Text {
  text: string[];
}

export interface Intent {
  displayName: string;
  name: string;
}

export interface OutputContext {
  name: string;
  parameters: Parameters;
}

export interface Parameters {
  'no-input': number;
  'no-match': number;
}
