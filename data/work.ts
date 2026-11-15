// Recent work: real job photos and customer reviews.
// Both lists are empty until the real material arrives. While they are empty the section
// shows marked slots on preview builds and is left off the live site entirely.
// Reviews: the customer's own words and first name only. No review platform is named.

export type WorkPhoto = { src: string; alt: string };
export type WorkReview = { quote: string; firstName: string; job: string };

export const workPhotos: WorkPhoto[] = [];
export const workReviews: WorkReview[] = [];
