import {gql} from 'apollo-boost';

const getAuthor = gql`
    {
        authors{
            id,
            name
        }
    }
`;

const getBooks = gql`
    {
        get_data_book{
            id,
            name,
            genre,
            list_author{
                name,
                age
            }
        }
    }
`;

const getBookDetail = gql`
    query($id: ID){
        get_data_book_detail(id: $id){
            id,
            id_author_fk,
            name,
            genre,
            list_author{
                id,
                name
            }
        }
    }
`;

const addBookMutation = gql`
    mutation($name: String!,$genre: String!,$id_author_fk: ID!){
        add_book(name: $name,genre: $genre,id_author_fk: $id_author_fk){
            name
        }
    }
`;

const editBookMutation = gql`
    mutation($id: ID!, $name: String!,$genre: String!,$id_author_fk: ID!){
        update_book(id: $id,name: $name,genre: $genre,id_author_fk: $id_author_fk){
            name
        }
    }
`;

const deleteBookMutation = gql`
    mutation($id: ID!){
        delete_book(id:$id){
            name
        }
    }
`;


export {getAuthor,getBooks,getBookDetail,addBookMutation,editBookMutation,deleteBookMutation}

