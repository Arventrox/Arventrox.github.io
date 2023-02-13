import React, {
  FC,
  useState,
  FormEvent,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import style from './PlayerRender.module.scss';
import { getRandomChampionByRole } from './Role';
import questionMarkImage from '../assets/images/question_mark.svg';
import { BtnContext } from '../store/context';
import { PlayerChampion, Champion, Role } from '../store/context';
import { Champions } from './Champion';

interface Props {
  playerName: string | string[];
  playerChampion: PlayerChampion;
  currentPlayerIndex: number;
  isRoleLoader: boolean;
  isChampionLoader: boolean;
  setIsRoleLoader: Dispatch<SetStateAction<boolean[]>>;
  setIsChampionLoader: Dispatch<SetStateAction<boolean[]>>;
  index: number;
}

const PlayerRender: FC<Props> = ({
  playerChampion,
  playerName,
  currentPlayerIndex,
  isRoleLoader,
  isChampionLoader,
  setIsChampionLoader,
  setIsRoleLoader,
  index,
}) => {
  const [reroll, setReroll] = useState<PlayerChampion>();
  const [rerollCounter, setRerollCounter] = useState(2);
  const [renderedImage, setRenderedImage] = useState(questionMarkImage);
  const { setButtonClickCounter } = useContext(BtnContext);

  const [roleLoader, setRoleLoader] = useState<Role>({ roleImg: '', roleName: '' });
  const [championLoader, setChampionLoader] = useState<Champion>({
    championName: '',
    championImage_url: '',
  });
  const { role, champion } = playerChampion;
  const { championImage_url, championName } = champion;
  const { roleImg, roleName } = role;
  const { topChampion, jungleChampion, midChampion, bottomChampion, supportChampion } = Champions();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const roles = [topChampion, jungleChampion, midChampion, bottomChampion, supportChampion];

  const championImage = !reroll?.champion.championImage_url
    ? championImage_url
    : reroll.champion.championImage_url;

  const renderedImageClass = style.champion_image;

  useEffect(() => {
    if (intervalId === null) {
      return;
    }
    return () => clearInterval(intervalId);
  }, [intervalId]);

  useEffect(() => {
    if (isChampionLoader) {
      championLoaderHandler();
      // setIsChampionLoader(false);
    }
  }, [isChampionLoader]);

  useEffect(() => {
    if (isRoleLoader) {
      roleLoaderHandler();
      // setIsRoleLoader(false);
    }
  }, [isRoleLoader]);

  useEffect(() => {
    setRenderedImage(championImage);
  }, [championImage]);

  const roleLoaderHandler = () => {
    // setChampionLoader(topChampion.champion);

    const id = setInterval(() => {
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      const randomRoleIndex = roles.indexOf(randomRole);

      if (randomRoleIndex !== -1) {
        roles.splice(randomRoleIndex, 1);
        setRoleLoader(randomRole.role);
      }
    }, 500);

    setIntervalId(id);

    setTimeout(() => {
      clearInterval(id);
      setIntervalId(null);
    }, 2500);
    // setIsRoleLoader(false);
    setButtonClickCounter((prevState) => prevState + 1);
  };

  const championLoaderHandler = () => {
    // setRoleLoader(topChampion.role);
    // setChampionLoader(topChampion.champion);

    const id = setInterval(() => {
      const randomChampion = roles[Math.floor(Math.random() * roles.length)];
      // const randomChampion = roles.filter(champion=> roles[roleLoader?.roleName]);
      // const a = roles.findIndex(/);
      // const a = roleLoader.roleName.indexOf
      // const randomChampionRole = roles[+a].champion.championName
      // console.log(a);

      const randomChampionIndex = roles.indexOf(randomChampion);

      if (randomChampionIndex !== -1) {
        roles.splice(randomChampionIndex, 1);
        setChampionLoader(randomChampion.champion);
      }
    }, 500);
    setIntervalId(id);
    setTimeout(() => {
      clearInterval(id);
      setIntervalId(null);
    }, 2000);
    // setIsChampionLoader()
    // setIsChampionLoader(isRole[false]);
  };

  const rerollHandler = (event: FormEvent) => {
    event.preventDefault();
    const randomChampionByRole = getRandomChampionByRole(playerChampion.role.roleName);

    if (rerollCounter === 0) {
      return;
    }

    setRerollCounter(rerollCounter - 1);
    setReroll(randomChampionByRole);
  };

  return (
    <div className={style.container}>
      <div className={style.img_container}>
        <img
          src={renderedImage}
          className={renderedImageClass}
          alt='champion image'
          loading='lazy'
        />
      </div>
      <p>Name: {playerName}</p>

      {!intervalId && isRoleLoader ? (
        <span className={style.role_container}>
          <img src={roleImg}></img>
          <p>Role: {roleName}</p>
        </span>
      ) : (
        <span className={style.role_container}>
          <img src={roleLoader?.roleImg}></img>
          <p> {roleLoader?.roleName}</p>
        </span>
      )}
      {!intervalId && isChampionLoader ? (
        <p>
          Champion: {reroll?.champion.championName ? reroll.champion.championName : championName}
        </p>
      ) : (
        <p> {championLoader?.championName}</p>
      )}

      <button
        className={rerollCounter ? style.reroll_button__active : style.reroll_button__disabled}
        onClick={rerollHandler}
      >
        <span className={style.hover_text}>You have {rerollCounter} rerolls left </span>
      </button>
    </div>
  );
};

export default PlayerRender;
