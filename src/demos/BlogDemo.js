import React, { useRef, useState } from 'react';
import { useI18n } from '../i18n';

const BlogDemo = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [shareStatus, setShareStatus] = useState('');
  const { t } = useI18n();

  const handlePublish = () => {
    const content = editorRef.current?.innerHTML || '';
    const trimmedTitle = title.trim();
    if (!trimmedTitle || content.trim().length === 0) {
      return;
    }
    const newPost = {
      id: Date.now(),
      title: trimmedTitle,
      content,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setTitle('');
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  const addComment = (postId, text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, trimmed] } : post
      )
    );
  };

  const sharePost = async (post) => {
    setShareStatus('');
    const shareText = `${post.title} - ${t('demos.share')}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: shareText });
        setShareStatus(t('demos.shareSuccess'));
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setShareStatus(t('demos.shareCopied'));
    } catch (err) {
      setShareStatus(t('demos.shareFail'));
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>{t('demos.blogTitle')}</h2>
          <p>{t('demos.blogSubtitle')}</p>
        </div>
      </header>

      <section className="demo-panel">
        <h3>{t('demos.newPost')}</h3>
        <div className="demo-form">
          <input
            type="text"
            placeholder={t('demos.postTitle')}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div
            ref={editorRef}
            className="demo-editor"
            contentEditable
            suppressContentEditableWarning
            data-placeholder={t('demos.writePost')}
          />
          <button type="button" onClick={handlePublish}>
            {t('demos.publish')}
          </button>
        </div>
      </section>

      {shareStatus && <p className="demo-status">{shareStatus}</p>}

      <section className="demo-panel">
        <h3>{t('demos.posts')}</h3>
        {posts.length === 0 ? (
          <p>{t('demos.noPosts')}</p>
        ) : (
          <div className="demo-list">
            {posts.map((post) => (
              <article key={post.id} className="demo-post">
                <h4>{post.title}</h4>
                <div className="demo-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                <div className="demo-actions">
                  <button type="button" onClick={() => sharePost(post)}>
                    {t('demos.share')}
                  </button>
                </div>
                <div className="demo-comments">
                  <h5>{t('demos.comments')}</h5>
                  <CommentBox onSubmit={(text) => addComment(post.id, text)} />
                  {post.comments.length === 0 ? (
                    <p>{t('demos.noComments')}</p>
                  ) : (
                    post.comments.map((comment, index) => (
                      <div key={`${post.id}-${index}`} className="demo-comment">
                        {comment}
                      </div>
                    ))
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const CommentBox = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const { t } = useI18n();

  return (
    <div className="demo-form-row">
      <input
        type="text"
        placeholder={t('demos.writeComment')}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          onSubmit(value);
          setValue('');
        }}
      >
        {t('demos.send')}
      </button>
    </div>
  );
};

export default BlogDemo;
