import { gql } from "@apollo/client";

const GET_MUSIC = gql`
  query musics($first: Int = 10) {
    musics(first: $first) {
      nodes {
        title
        afmusicfields {
          musicArtistRelationship {
            ... on Artist {
              id
              title
            }
          }
          track {
            id
            mediaItemUrl
          }
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

export default GET_MUSIC;
