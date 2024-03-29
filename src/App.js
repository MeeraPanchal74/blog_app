
import './App.css';
import { useState, useEffect } from 'react';
import PostList from './Components/PostList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPost from './Components/AddPost';
import EditPost from './Components/EditPost';
import Loading from './Components/Loading';

// const Postlist = [
//   {
//     id: 1,
//     title: 'Leanne Graham',
//     data: 'this is my first post',
//     date: "12/09/2023"
//   },
//   {
//     id: 2,
//     title: 'Ervin Howell',
//     data: 'this is my second post',
//     date: "10/14/2023"
//   },
//   {
//     id: 3,
//     title: 'Clementine Bauch',
//     data: 'this is my third post',
//     date: "4/09/2022"
//   },
//   {
//     id: 4,
//     title: 'Godwin Austin',
//     data: 'this is my 4th post',
//     date: "4/09/2021"
//   },
//   {
//     id: 5,
//     title: 'Laura rangman',
//     data: 'this is my 5th post',
//     date: "10/20/2021"
//   },

// ];
function App() {

  const [filterText, setFilterText] = useState("All");
  const [fetchedPost, setfetchedPost] = useState([]);
  const [loading, setLoading] = useState(false);
  let [user, setUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [])

  const filterProductList = fetchedPost.filter((post) => {

    const postDate = new Date(post.date);

    if (filterText === 'past') {
      return postDate < new Date("01/01/2022");
    }
    else if (filterText === 'future') {
      return new Date(post.date) > new Date("12/31/2022");
    }
    else if (filterText === 'current') {
      return new Date(post.date) <= new Date("12/31/2022") & new Date(post.date) >= new Date("01/01/2022");
    }
    else return post;
  })

  const newdate = new Date();
  const date = newdate.getDate();
  let month = newdate.getMonth() + 1;
  let year = newdate.getFullYear();
  const strin = `${month}/${date}/${year}`;

  const createPost = (ntitle, ndata) => {

    const newPost = {
      title: ntitle,
      data: ndata,
      date: strin,
    }

    fetch("https://post-fb1cd-default-rtdb.firebaseio.com/post.json", {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        fetchUsers();
      })
  }

  const editPost = (eTitle, eData) => {
    const editedPost = {
      title: eTitle,
      data: eData,
      date: strin,
    }

    fetch(`https://post-fb1cd-default-rtdb.firebaseio.com/post/${user.id}.json`, {
      method: 'PUT',
      body: JSON.stringify(editedPost),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        fetchUsers();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }
  function fetchUsers() {

    setLoading(true);


    fetch("https://post-fb1cd-default-rtdb.firebaseio.com/post.json", {
      method: 'GET',

    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Something went wrong!!!');
        }
        return resp.json();
      })
      .then((data) => {
        const postData = [];
        for (let key in data) {
          postData.push({ ...data[key], id: key });
        }
        setfetchedPost(postData);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      })
  }
  let OnFilter = (filter) => {
    setFilterText(filter);
  }

  let postEdited = function (user) {
    setUser(user);
  };

  let postDeleted = (user) => {

    let del = window.confirm("you really want to delete this post??");

    if (del) {
      fetch(`https://post-fb1cd-default-rtdb.firebaseio.com/post/${user.id}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          fetchUsers();
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }

  }
  return (

    <div className="App">

      <h1>MY POSTS</h1>
      
      <BrowserRouter>

        <Routes>
          <Route exact path='/AddPost' element={<AddPost createPost={createPost} />} />
          <Route exact path='/PostList' element={<PostList newList={filterProductList} onFilter={OnFilter} postEdited={postEdited} postDeleted={postDeleted} />} />
          <Route exact path='/EditPost' element={<EditPost user={user} editPost={editPost} />} />
          {!loading && <Route exact path='/' element={<PostList newList={filterProductList} onFilter={OnFilter} postEdited={postEdited} postDeleted={postDeleted} />} />}
          {loading && <Route exact path='/' element={<Loading />} />}
        </Routes>

  </BrowserRouter>

    </div>

  );
}

export default App;
