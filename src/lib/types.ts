import moment from "moment";

type Ability = {
  Description: {
    itemDescription: {
      cooldown: string;
      cost: string;
      description: string;
      menuitems: {
        description: string;
        value: string;
      }[];
      rankitems: {
        description: string;
        value: string;
      }[];
      secondaryDescription: string;
    };
  };
  Id: number;
  Summary: string;
  URL: string;
};

type AbilityDescription = {
  itemDescription: {
    cooldown: string;
    cost: string;
    description: string;
    menuitems: {
      description: string;
      value: string;
    }[];
    rankItems: {
      description: string;
      value: string;
    };
    secondaryDescription: string;
  };
};

export type God = {
  Ability1: string;
  Ability2: string;
  Ability3: string;
  Ability4: string;
  Ability5: string;
  AbilityId1: number;
  AbilityId2: number;
  AbilityId3: number;
  AbilityId4: number;
  AbilityId5: number;
  Ability_1: Ability;
  Ability_2: Ability;
  Ability_3: Ability;
  Ability_4: Ability;
  Ability_5: Ability;
  AttackSpeed: number;
  AttackSpeedPerLevel: number;
  Cons: string;
  HP5PerLevel: number;
  Health: number;
  HealthPerFive: number;
  HealthPerLevel: string;
  Lore: string;
  MP5PerLevel: number;
  MagicProtection: number;
  MagicProtectionPerLevel: number;
  MagicalPower: number;
  MagicalPowerPerLevel: number;
  Mana: number;
  ManaPerFive: number;
  ManaPerLevel: number;
  Name: string;
  OnFreeRotation: string;
  Pantheon: string;
  PhysicalPower: number;
  PhysicalPowerPerLevel: number;
  PhysicalProtection: number;
  PhysicalProtectionPerLevel: number;
  Pros: string;
  Roles: " Assassin" | " Hunter" | " Guardian" | " Mage" | " Warrior";
  Speed: number;
  Title: string;
  Type: string;
  abilityDescription1: AbilityDescription;
  abilityDescription2: AbilityDescription;
  abilityDescription3: AbilityDescription;
  abilityDescription4: AbilityDescription;
  abilityDescription5: AbilityDescription;
  basicAttack: AbilityDescription;
  godAbility1_URL: string;
  godAbility2_URL: string;
  godAbility3_URL: string;
  godAbility4_URL: string;
  godAbility5_URL: string;
  godCard_URL: string;
  godIcon_URL: string;
  id: number;
  latestGod: "y" | "n";
  ret_msg: null;
};

export type Gods = God[];

export type Session = {
  ret_msg: string;
  session_id: string;
  timestamp: moment.Moment;
};

export type Item = {
  ActiveFlag: "y" | "n";
  ChildItemId: number;
  DeviceName: string;
  IconId: number;
  ItemDescription: {
    Description: string;
    Menuitems: [];
    SecondaryDescription: string;
  };
  ItemId: number;
  ItemTier: number;
  Price: number;
  RestrictedRoles: "no restrictions";
  RootItemId: number;
  ShortDesc: string;
  StartingItem: boolean;
  Type: "Consumable" | "Active" | "Item";
  itemIcon_URL: string;
  ret_msg: null;
};

export type Build = {
  god_id: number;
  title: string;
  subtitle: string;
  final: Item[];
  starter: Item[];
  relics: Item[];
  explanation: string;
  id: string;
};

export type Post = {
  id: number;
  featured_image: string;
  large_image: string;
  author: string;
  title: string;
  timestamp: string;
  real_categories: string;
  slug: string;
};

type ThumbnailType = {
  height: number;
  url: string;
  width: number;
};

type Thumbnail = {
  default: ThumbnailType;
  high: ThumbnailType;
  maxres: ThumbnailType;
  medium: ThumbnailType;
  standard: ThumbnailType;
};

export type Video = {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    resourceId: { kind: string; videoId: string };
    thumbnails: Thumbnail;
    title: string;
  };
};

export type Youtube = {
  etag: string;
  items: Video[];
  kind: string;
  nextPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
};
