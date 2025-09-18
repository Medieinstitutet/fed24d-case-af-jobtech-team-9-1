import { DigiLayoutContainer } from '@digi/arbetsformedlingen-react';
import { JobList } from '../components/JobList';
import { Search } from '../components/Search';

export const Home = () => {
  return (
    <div className="home">
      <DigiLayoutContainer afVerticalPadding >
        <div>
          <Search />
          <JobList />
        </div>
      </DigiLayoutContainer>
    </div>
  );
};
