import "./App.css";
import "bulma/css/bulma.min.css";
import { Box, Columns, Heading, Table, Form, Button, Icon } from "react-bulma-components";
import { useEffect, useState } from "react";
import { deleteContact, getAllContacts, getContact, writeContactData } from "./firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function App() {
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, phone, gender } = e.target;

        const id = editContact.id || Date.now();
        if (editContact) setEditContact(false);
        console.log(id, username.value, phone.value, gender.value);
        writeContactData(id, username.value, phone.value, gender.value);
        e.target.reset();
        getAllContacts(setContacts);
    };
    const handleDelete = (e) => {
        const id = e.currentTarget.title;
        deleteContact(id);
        getAllContacts(setContacts);
    };
    const handleEdit = (e) => {
        const id = e.currentTarget.title;
        console.log(editContact);
        getContact(id, setEditContact);
        console.log(editContact);
    };

    useEffect(() => {
        getAllContacts(setContacts);
    }, []);

    return (
        <Columns id="content">
            <Columns.Column size={"one-quarter"} id="left">
                <Box textAlign={"center"}>
                    <Heading>FireContact App</Heading>
                </Box>
                <Box textAlign={"center"}>
                    <Heading size={4}>Add Contact</Heading>
                </Box>
                <Box>
                    <form onSubmit={handleSubmit}>
                        <Form.Field>
                            <Form.Label>Username</Form.Label>
                            <Form.Control>
                                <Form.Input
                                    type={"text"}
                                    required
                                    name="username"
                                    defaultValue={editContact ? editContact.username : ""}
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control>
                                <Form.Input
                                    type={"tel"}
                                    required
                                    name="phone"
                                    defaultValue={editContact ? editContact.phone : ""}
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Control>
                                <Form.Radio value="Male" name="gender">
                                    {"  "}Male
                                </Form.Radio>
                                <Form.Radio value="Female" name="gender">
                                    {"  "}Female
                                </Form.Radio>
                                <Form.Radio value="Other" name="gender">
                                    {"  "}Other
                                </Form.Radio>
                            </Form.Control>
                        </Form.Field>

                        <Button.Group>
                            <Button color="link" type="submit" fullwidth>
                                Add
                            </Button>
                        </Button.Group>
                    </form>
                </Box>
            </Columns.Column>
            <Columns.Column size={"half"} id="right">
                <Box textAlign={"center"}>
                    <Heading>Contacts</Heading>
                </Box>
                <Box>
                    <Table size="fullwidth" textAlign="center">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Boolean(contacts.length) ? (
                                contacts.map((contact) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>{contact.username}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.gender}</td>
                                            <td>
                                                <Button
                                                    size={"small"}
                                                    text
                                                    onClick={handleDelete}
                                                    title={contact.id}
                                                >
                                                    <Icon>
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </Icon>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    size={"small"}
                                                    text
                                                    onClick={handleEdit}
                                                    title={contact.id}
                                                >
                                                    <Icon>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </Icon>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5}>Nothing to show here...</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Box>
            </Columns.Column>
        </Columns>
    );
}

export default App;
