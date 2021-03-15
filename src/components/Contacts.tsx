import { useQuery } from "@apollo/client";
import { CONTACTS_QUERY } from "../api/query";
import {
  GetContacts,
  GetContacts_contact_contact,
} from "../generated/GetContacts";
import { notUndefined } from "../utils";

export function Contacts() {
  const { data } = useQuery<GetContacts>(CONTACTS_QUERY);

  if (data && data.contact && data.contact.contact) {
    return (
      <div className="main-container d-flex flex-column justify-content-around">
        <div className="container">
          <div className="row text-center text-white">
            {data.contact.contact.filter(notUndefined).map((e, i) => {
              return (
                <div key={i} className="col fade-bottom-up">
                  <Contact contact={e} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

function Contact({ contact }: { contact: GetContacts_contact_contact }) {
  return (
    <>
      {contact.address && <h1>{contact.address.city}</h1>}
      {contact.address && (
        <h3>{`${contact.address.street}, ${contact.address.postal_code}`}</h3>
      )}
      <h3>{contact.email}</h3>
      <h3>{contact.telephone}</h3>
    </>
  );
}
