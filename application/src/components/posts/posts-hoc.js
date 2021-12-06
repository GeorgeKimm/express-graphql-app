import { graphql } from "react-apollo";
import { compose } from "recompose";

import { postsQuery } from "./queries";
import { deletePostMutation } from "./mutation";

const withGraphQL = compose(
  graphql(postsQuery, {
    options: ({ name = "" }) => ({
      variables: { name },
    }),
  }),
  graphql(deletePostMutation, {
    props: ({ mutate }) => ({
      deletePost: (id) =>
        mutate({
          variables: id,
          refetchQueries: [
            {
              query: postsQuery,
              variables: { name: "" },
            },
          ],
        }),
    }),
  })
);

export default withGraphQL;
