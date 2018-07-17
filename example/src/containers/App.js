import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectPost, fetchPostsIfNeeded } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    selectedPost: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedPost } = this.props
    dispatch(fetchPostsIfNeeded(selectedPost))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPost !== this.props.selectedPost) {
      const { dispatch, selectedPost } = nextProps
      dispatch(fetchPostsIfNeeded(selectedPost))
    }
  }

  handleChange = nextPost => {
    this.props.dispatch(selectPost(nextPost))
  }

  handleRefreshClick = event => {
    event.preventDefault()

    const { dispatch, selectedPost } = this.props
    dispatch(fetchPostsIfNeeded(selectedPost))
  }

  render() {
    const { selectedPost, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedPost}
                onChange={this.handleChange}
                options={[ 'lucasassis413@gmail.com', 'andrew@gmail.com' ]} />
        <p>
        {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
        }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedPost, postsByUser } = state
  const {
    isFetching,
    items: posts
  } = postsByUser[selectedPost] || {
    isFetching: true,
    items: []
  }

  return {
    selectedPost,
    posts,
    isFetching,
  }
}

export default connect(mapStateToProps)(App)
