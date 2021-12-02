const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Posts = require("../models/post");

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    author: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    post: {
      type: PostType,
      agrs: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Posts.findById(id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      args: { name: { type: GraphQLString } }, // ну а эту строку убрать
      resolve(parent, { name }) {
        // если не получится попробую с (parent, args)
        return Directors.find({ name: { $regex: name, $options: "i" } }); // а тут просто {}
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
