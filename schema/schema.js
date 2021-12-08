const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const Posts = require("../models/post");
const Contacts = require("../models/contact");

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    link: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Posts.findById(id);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      args: { name: { type: GraphQLString } }, // ну а эту строку убрать
      resolve(parent, { name }) {
        // если не получится попробую с (parent, args)
        return Posts.find({ name: { $regex: name, $options: "i" } }); // а тут просто {}
      },
    },
    contacts: {
      type: new GraphQLList(ContactType),
      args: { name: { type: GraphQLString } },
      resolve(parent, { name }) {
        return Contacts.find({ name: { $regex: name, $options: "i" } });
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { text, title, author }) {
        const post = new Posts({
          text,
          title,
          author,
        });
        return post.save();
      },
    },
    deletePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Posts.findByIdAndRemove(id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
