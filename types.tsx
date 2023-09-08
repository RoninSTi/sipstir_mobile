export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Account = {
  image: string;
  location: AccountLocation;
}

export type AccountLocation = {
  photo: AccountPhoto;
}

export type AccountPhoto = {
  photo_reference: string;
}

export type Post = {
  id: string;
}

export type User = {
  avatar: string;
  username: string;
}