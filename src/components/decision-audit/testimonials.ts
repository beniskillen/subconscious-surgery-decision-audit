import { asset } from "@/lib/asset";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  source?: string;
  /** YouTube watch URL */
  videoUrl?: string;
  /** YouTube video id for embeds / thumbs */
  youtubeId?: string;
  /** Local avatar from Adrian's testimonials page */
  avatar?: string;
  /** Local poster / thumbnail path */
  poster?: string;
};

export type CaseStudyVideo = {
  name: string;
  role: string;
  src: string;
  poster: string;
  youtubeId: string;
};

/**
 * Client language from Subconscious Surgery YouTube captions and
 * https://www.subconscioussurgery.com/testimonials (avatars + LinkedIn quotes).
 */
export const CASE_STUDY_VIDEOS: CaseStudyVideo[] = [
  {
    name: "Latonya",
    role: "1:1 and Mastermind",
    src: asset("brand/testimonials/case-1.mp4"),
    poster: asset("brand/testimonials/case-1-poster.jpg"),
    youtubeId: "lkb-i_kCgMA",
  },
  {
    name: "William Wick III",
    role: "Client testimonial",
    src: asset("brand/testimonials/case-2.mp4"),
    poster: asset("brand/testimonials/case-2-face.jpg"),
    youtubeId: "84Qh3rGVT60",
  },
  {
    name: "Tiffany",
    role: "Mastermind class",
    src: asset("brand/testimonials/case-3.mp4"),
    poster: asset("brand/testimonials/case-3-poster.jpg"),
    youtubeId: "LiNFkSYLG2w",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "When I first met Adrian Taffinder, I was very sceptical that he could achieve what he was promising - but he did. After the second or third session, I started to feel lighter, as if a weight had been lifted off my shoulders. I've become more laid back without being any less driven to succeed.",
    name: "Howard Mostyn",
    role: "Managing Director, UK",
    source: "Verified client",
    avatar: asset("brand/avatars/howard.png"),
  },
  {
    quote:
      "Adrian never ceases to amaze me with his knowledge. I have been working with him for well over 3 years now. And it has been life-changing to say the least. More people need to experience what he offers.",
    name: "Tristen",
    role: "Adventure entrepreneur, 1.9M followers",
    source: "Verified client",
    avatar: asset("brand/avatars/tristan.png"),
  },
  {
    quote:
      "I have been working with Adrian Taffinder for a few months now. Our sessions have been a blessing - from helping me navigate being the best mother to my dragon child, to working through blockages in my finances.",
    name: "Jennifer Nyx",
    role: "Entrepreneur",
    source: "Verified client",
    avatar: asset("brand/avatars/jennifer-nyx.png"),
  },
  {
    quote:
      "Adrian is a fantastic coach and I've learned so much from him. I've had lots of coaches and mentors in the past but no one has even come close to Adrian. He has this amazing ability to see what's holding you back, then provides a script to work through it.",
    name: "Nick Screeton",
    role: "CEO, LEP Fitness",
    source: "Verified client",
    avatar: asset("brand/avatars/nick.png"),
  },
  {
    quote:
      "My confidence, new business enquiries, feedback and conversions have grown at a very positive and dramatic speed. Just investing an hour a week has made the most amazing impact on me and my business in just one month.",
    name: "Ellie MacDonald",
    role: "Founder, MacComms PR",
    source: "Verified client",
    avatar: asset("brand/avatars/ellie.png"),
  },
  {
    quote:
      "In just 2 sessions he removed a massive chunk of anxiety and confusion that was holding me back. I feel lighter and a sense of relief - uncovering things I thought I had conquered, but had actually just buried deep.",
    name: "Steph Skelly",
    role: "Personal Trainer & Lifestyle Coach",
    source: "Verified client",
    avatar: asset("brand/avatars/steph.png"),
  },
  {
    quote:
      "His subconscious surgery is awesome. We did a lot of inside work on things from my past that were released and I could literally feel the release as they come up. Adrian's intelligence, his quickness and his authenticity are amazing.",
    name: "William Wick III",
    role: "Client testimonial",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=84Qh3rGVT60",
    youtubeId: "84Qh3rGVT60",
    poster: asset("brand/testimonials/yt-84Qh3rGVT60.jpg"),
  },
  {
    quote:
      "Subconscious surgery is life-changing. You could be struggling in insecurities and your confidence and then you do this and next thing you know you're feeling confident, feeling on top of the world, feeling like you can accomplish anything.",
    name: "Latonya",
    role: "1:1 and Mastermind participant",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=lkb-i_kCgMA",
    youtubeId: "lkb-i_kCgMA",
    poster: asset("brand/testimonials/yt-lkb-i_kCgMA.jpg"),
  },
  {
    quote:
      "If you want change and the real deal, this is it. If you really need change in your life, visible change, you got to apply yourself. It is life-changing. Literally. Every bit of it's worth it. I went all in.",
    name: "Dorinda",
    role: "Subconscious Mastery Program",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=r0g3hTQSagw",
    youtubeId: "r0g3hTQSagw",
    poster: asset("brand/testimonials/yt-r0g3hTQSagw.jpg"),
  },
  {
    quote:
      "I remember the very first session. I felt really refreshed and rejuvenated after it. I noticed the difference in my physical reality, in the way that I was doing things and handling things. Even from the first sessions I got to experience financial freedom.",
    name: "Latonya",
    role: "On the first Subconscious Surgery session",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=82XTA4PZ82w",
    youtubeId: "82XTA4PZ82w",
    poster: asset("brand/testimonials/yt-82XTA4PZ82w.jpg"),
  },
  {
    quote:
      "My favourite part is when you're doing the subconscious surgery part of it. You know it's like the most amazing feeling. I'm excited to know that there is going to be a continuance.",
    name: "Trinia",
    role: "Mastermind participant",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=-tQ3LDD_v4Q",
    youtubeId: "-tQ3LDD_v4Q",
    poster: asset("brand/testimonials/yt--tQ3LDD_v4Q.jpg"),
  },
  {
    quote:
      "The intentions I said when I joined were to increase my confidence and my self-esteem. I don't even recognise the person that I was back then. I feel stronger and more confident. I got the most that I needed to get out of this class.",
    name: "Tiffany",
    role: "Mastermind class participant",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=LiNFkSYLG2w",
    youtubeId: "LiNFkSYLG2w",
    poster: asset("brand/testimonials/yt-LiNFkSYLG2w.jpg"),
  },
  {
    quote:
      "Last year when we started this I was on disability for mental health. I am in a much much better place than I was 12 months ago. This has been a really really great experience.",
    name: "Marian",
    role: "Mastermind participant",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=QvbN_FKu52c",
    youtubeId: "QvbN_FKu52c",
    poster: asset("brand/testimonials/yt-QvbN_FKu52c.jpg"),
  },
  {
    quote:
      "I've gotten all these mental shifts and my attitude has changed. Those small shifts that I made throughout the year made big impacts. My life is more intentional. Consciously I've evolved. More self-aware.",
    name: "Ashley",
    role: "Mastermind participant",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=mVVjeQ5LEsc",
    youtubeId: "mVVjeQ5LEsc",
    poster: asset("brand/testimonials/yt-mVVjeQ5LEsc.jpg"),
  },
  {
    quote:
      "I thought it was well put together. You put in a lot of effort. It was very ordered and structured. I liked that you included everybody and what we wanted to work on specifically, the areas everybody was struggling with.",
    name: "Latanya",
    role: "Mastermind participant",
    source: "YouTube",
    videoUrl: "https://www.youtube.com/watch?v=KcrVnwPb-BE",
    youtubeId: "KcrVnwPb-BE",
    poster: asset("brand/testimonials/yt-KcrVnwPb-BE.jpg"),
  },
];
