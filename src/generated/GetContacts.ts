/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContacts
// ====================================================

export interface GetContacts_contact_contact_address {
  __typename: "ComponentContactAddress";
  street: string;
  postal_code: number;
  city: string;
}

export interface GetContacts_contact_contact {
  __typename: "ComponentContactContact";
  address: GetContacts_contact_contact_address | null;
  email: string;
  telephone: any;
}

export interface GetContacts_contact {
  __typename: "Contacts";
  contact: (GetContacts_contact_contact | null)[] | null;
}

export interface GetContacts {
  contact: GetContacts_contact | null;
}
