import { AccountEvaluate } from "../interfaces/account-evaluate.model";
import { PlanResource } from "../interfaces/plan-resource.model";

export enum DocumentTypeNumber {
    CC = 'Cedula',
    CE = 'Cedula Extranjera',
    PS = 'Pasaporte',
    NI = 'NIT',
    CD = 'Cedula Diplomatica',
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
