type User = {
  id: string;
  name: string;
  email: string;
  lastLoginAt: string | firebase.firestore.FieldValue;
  textoreelCount: number;
  textoreels?: Array<ReelObject>;
  likedTextoreels?: Array<ReelObject>;
};

type ReelObject = {
  id: string;
  message: string;
  views: number;
  likes: number;
  likedBy: Array<Pick<User, "name" | "email">>;
  backgroundColor: string;
  textColor: string;
  createdAt: string | firebase.firestore.FieldValue;
  createdBy: Pick<User, "name" | "email">;
};
