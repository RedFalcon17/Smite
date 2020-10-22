import { Gods } from "./types";

export function handleGods(gods: Gods) {
  const assassins: Gods = [],
    guardians: Gods = [],
    hunters: Gods = [],
    mages: Gods = [],
    warriors: Gods = [];
  gods.forEach(god => {
    switch (god.Roles) {
      case " Assassin":
        return assassins.push(god);
      case " Guardian":
        return guardians.push(god);
      case " Hunter":
        return hunters.push(god);
      case " Mage":
        return mages.push(god);
      case " Warrior":
        return warriors.push(god);
    }
  });
  return { assassins, guardians, hunters, mages, warriors };
}
