export interface QuoterResponse {
    data:            Quoter;
    transactionId:   string;
    operationId:     string;
    statusCode:      number;
    transactionName: string;
}

export interface QuoterRequest {
    quotationTerm: number,
    quotationAmount: number
}

export interface Quoter {
    monthlyPayment: number,
    quotationTerm?: number,
    quotationAmount?: number
} 