//회원 탈퇴
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsXLg, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { OptOutModalHandler } from '../../pages/MyPage';
import { delAccount } from '../../util/apiCollection';
import { initialToken } from '../../store/login';

export interface OptOutInputs {
  headers: Header;
  body: string;
}

interface Header {
  Authorization: string | null;
}

const OptOut = ({ openOptOutModalHandler }: OptOutModalHandler) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState();

  const [viewPassword, setViewPassword] = useState(false);
  const viewPasswordHandler = (event: React.MouseEvent<HTMLElement>) => {
    setViewPassword(!viewPassword);
  };

  const config = {
    headers: { Authorization: initialToken },
    body: password,
  };

  const handleOptOut = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const loginResult = await delAccount();
    switch (loginResult.status) {
      case 200:
        openOptOutModalHandler;
        localStorage.clear();
        navigate('/');
        break;
      case 401:
        alert('비밀번호가 일치하지 않습니다.');
        console.error(loginResult.status + ' Error');
        break;
      default:
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="p-3 ml-auto" onClick={openOptOutModalHandler}>
          <BsXLg />
        </button>
        <div className="px-24 py-16">
          <div className="text-4xl">정말 탈퇴하시겠습니까?</div>
          <div className="my-2 text-xl text-slate-500">
            회원탈퇴를 위해 비빌번호를 입력해주세요
          </div>
          <div className="flex items-end p-2 border-b">
            {viewPassword ? (
              <input
                type="text"
                value={password}
                placeholder="비밀번호"
                className="flex w-full py-2 mt-24 text-lg"
              />
            ) : (
              <input
                type="password"
                value={password}
                placeholder="비밀번호"
                className="flex w-full py-2 mt-24 text-lg"
              />
            )}

            <button onClick={viewPasswordHandler} className="p-2">
              {viewPassword ? (
                <BsFillEyeSlashFill className="w-[20px] h-[20px] " />
              ) : (
                <BsFillEyeFill className="w-[20px] h-[20px]" />
              )}
            </button>
          </div>
          <div className="text-sm text-slate-500">
            {/* {true ? '비밀번호를 입력해주시요' : '비밀번호가 일치하지 않습니다.'} */}
          </div>
        </div>

        <div className="flex justify-center pt-20">
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl"
            onClick={openOptOutModalHandler}
          >
            아니요
          </button>
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300"
            onClick={handleOptOut}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptOut;
