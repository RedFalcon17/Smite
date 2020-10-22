import React, { useEffect, useState } from "react";
import { TwitchEmbed } from "../../components";
import { Post, Video, Youtube } from "../../lib/types";

import "./home.css";

export function Home() {
  const [recentPatch, setRecentPatch] = useState<Post | null>(null);
  const [recentVideo, setRecentVideo] = useState<Video | null>(null);

  useEffect(() => {
    let didCancel = false;
    async function getBlogs() {
      const response = await fetch(
        "https://cms.smitegame.com/wp-json/smite-api/get-posts/1?offset=0"
      );
      // eslint-disable-next-line
      const posts: Post[] = (await response.json()).filter((post: Post) => {
        const categories = post.real_categories.split(",");
        if (categories.includes("Update Notes")) return post;
      });
      if (!didCancel) {
        setRecentPatch(posts[0]);
      }
    }

    async function getYoutube() {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UU0QHB9e9eBE-jafchN4Zrgw&key=AIzaSyByAkJ_RvUhGT9NXy0q8Ldh-lK4mbw2FDg"
      );
      const videos: Youtube = await response.json();
      const order = videos.items.sort((a, b) => {
        return a.snippet.publishedAt > b.snippet.publishedAt
          ? -1
          : a.snippet.publishedAt < b.snippet.publishedAt
          ? 1
          : 0;
      });
      if (!didCancel) {
        setRecentVideo(order[0]);
      }
    }
    try {
      Promise.all([getBlogs(), getYoutube()]);
    } catch (error) {
      console.log(error);
    }
    return () => {
      didCancel = true;
    };
  }, []);
  return (
    <div className="home">
      {recentPatch ? (
        <a
          className="blog"
          href={`https://www.smitegame.com/news/${recentPatch.slug}`}
        >
          <img
            className="blog-photo"
            src={recentPatch.large_image}
            alt={recentPatch.title}
          />
          <div className="description white">
            <h3 className="blog-title">{recentPatch.title}</h3>
            <h5 className="read-more yellow caps">Read more</h5>
          </div>
        </a>
      ) : (
        <div className="blog"></div>
      )}
      <div className="videos">
        <div className="twitch-wrapper">
          <TwitchEmbed />
        </div>
        {recentVideo && (
          <div className="youtube-wrapper">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${recentVideo.snippet.resourceId.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={recentVideo.snippet.title}
            />
          </div>
        )}
      </div>
    </div>
  );
}
