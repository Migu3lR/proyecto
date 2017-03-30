import React, { Component, PropTypes } from 'react';

import PostBody from '../../posts/containers/Post';
import Comment from '../../comments/containers/Comment';
import Loading from '../../shared/components/Loading';

import api from '../../api';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: [],
    };
  }


  async componentDidMount() {
    const [
      post,
      comments,
    ] = await Promise.all([
      api.posts.getSingle(this.props.match.params.id),
      api.posts.getComments(this.props.match.params.id),
    ]);

    const user = await api.users.getSingle(post.user);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    });


  }


  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="post">

        <PostBody
          {...this.state.post}
          user={this.state.user}
          comments={this.state.comments}
        />
        <section>
          {this.state.comments
            .map(comment => (
              <Comment
                key={comment.id}
                {...comment}
              />
            ))
          }
        </section>

      </section>
    );
  }
}

Post.PropTypes = {
  match: match.params.PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

export default Post;
