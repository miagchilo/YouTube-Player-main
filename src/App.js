import './App.css';
import YouTubePlayer from './components/YouTubePlayer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Search from './components/Search';
import Playlists from './components/Playlists';
import CreatePlaylist from './components/CreatePlaylist';
import WatchPlaylist from './components/WatchPlaylist';
import Room from './components/Room';
import SearchForPlaylist from './components/SearchForPlaylist';
import PlaylistPlayer from './components/PlaylistPlayer';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Search isIndex={true} />} />
            <Route path="videos/:videoId" element={<YouTubePlayer />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlists/create" element={<CreatePlaylist />} />
            <Route path="playlists/:playlistId" element={<WatchPlaylist />} />
            <Route path="playlists/:playlistId/search" element={<SearchForPlaylist />} />
            <Route path="playlists/:playlistId/videos/:videoId" element={<PlaylistPlayer />} />
            <Route path="rooms/:roomId" element={<Room />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
