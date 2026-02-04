import React, { useRef, useState } from 'react';

const BlogDemo = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [shareStatus, setShareStatus] = useState('');

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
        post.id === postId
          ? { ...post, comments: [...post.comments, trimmed] }
          : post
      )
    );
  };

  const sharePost = async (post) => {
    setShareStatus('');
    const shareText = `${post.title} - Confira este post no blog`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: shareText });
        setShareStatus('Post compartilhado com sucesso.');
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setShareStatus('Link copiado para a área de transferência.');
    } catch (err) {
      setShareStatus('Não foi possível compartilhar agora.');
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <div>
          <h2>Blog Studio</h2>
          <p>Editor rich text, comentários e compartilhamento.</p>
        </div>
      </header>

      <section className="demo-panel">
        <h3>Novo post</h3>
        <div className="demo-form">
          <input
            type="text"
            placeholder="Título do post"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <div
            ref={editorRef}
            className="demo-editor"
            contentEditable
            suppressContentEditableWarning
            placeholder="Escreva seu post aqui..."
          />
          <button type="button" onClick={handlePublish}>
            Publicar
          </button>
        </div>
      </section>

      {shareStatus && <p className="demo-status">{shareStatus}</p>}

      <section className="demo-panel">
        <h3>Publicações</h3>
        {posts.length === 0 ? (
          <p>Nenhum post publicado.</p>
        ) : (
          <div className="demo-list">
            {posts.map((post) => (
              <article key={post.id} className="demo-post">
                <h4>{post.title}</h4>
                <div
                  className="demo-post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="demo-actions">
                  <button type="button" onClick={() => sharePost(post)}>
                    Compartilhar
                  </button>
                </div>
                <div className="demo-comments">
                  <h5>Comentários</h5>
                  <CommentBox onSubmit={(text) => addComment(post.id, text)} />
                  {post.comments.length === 0 ? (
                    <p>Nenhum comentário ainda.</p>
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

  return (
    <div className="demo-form-row">
      <input
        type="text"
        placeholder="Escreva um comentário"
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
        Enviar
      </button>
    </div>
  );
};

export default BlogDemo;
