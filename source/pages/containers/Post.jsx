import React, { Component, PropTypes } from 'react';

import PostBody from '../../posts/containers/Post';
import Comment from '../../comments/containers/Comment';
import Loading from '../../shared/components/Loading';

import api from '../../api';

import styles from './Page.css';

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
    this.initialFetch();
  }

  async initialFetch() {
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
      <section name="post" className={styles.section}>
        <section className={styles.main}>
          <PostBody
            {...this.state.post}
            user={this.state.user}
            comments={this.state.comments}
          />
        </section>
        <section className={styles.list}>
          {this.state.comments
            .map(comment => (
              <Comment key={comment.id} {...comment} />
            ))
          }
        </section>
      </section>
    );
  }
}

Post.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
};

Post.defaultProps = {
  match: {},
};

export default Post;
