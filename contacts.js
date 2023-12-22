import fs from "fs/promises";
import path from "path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

export async function updateContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  }
}

export async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      return null;
    }
    const deletedContact = contacts.splice(contactIndex, 1);
    await updateContacts(contacts);
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      name,
      email,
      phone,
      id: crypto.randomUUID(),
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
