import { NextResponse } from 'next/server';
import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Function to get the access token
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  return response.json();
};

// Function to fetch recently played tracks
const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response;
};

// Route handler for /api/recently-played
export async function GET() {
  try {
    const response = await getRecentlyPlayed();

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch recently played tracks: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    const tracks = data.items.map((item: any) => ({
      playedAt: item.played_at,
      title: item.track.name,
      album: item.track.album.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      albumImageUrl: item.track.album.images[0]?.url,
      songUrl: item.track.external_urls.spotify,
    }));

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching recently played tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recently played tracks.' },
      { status: 500 }
    );
  }
}
