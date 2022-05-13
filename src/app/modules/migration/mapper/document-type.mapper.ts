import { AccountEvaluate } from "../interfaces/account-evaluate.model";
import { PlanResource } from "../interfaces/plan-resource.model";

export enum DocumentTypeNumber {
    CC = 'Cedula',
    NI = 'NIT',
    PS = 'Pasaporte',
    CE = 'CedulaExtranjero',
    CD = 'CedulaDiplomatica',
}

function documentTypeKeysFin(documentType?: DocumentTypeNumber) {
  return Object.entries(DocumentTypeNumber).filter(([_, value]) => {
    return value === documentType;
  }).flat();
}

export function mapDocumentType(data: PlanResource): AccountEvaluate {
  const [ documentTypeSymbol ] = documentTypeKeysFin(data.identificationType);
  return {
    documentClient: `${documentTypeSymbol}-${data.identificationNumber}`
  };
}
