import type { NextPage } from "next";

//Components
import { DashboardLayout } from "../../components/layouts";

// Types
//import type { RootState } from "../../store";

//Redux
//import { useSelector, useDispatch } from "react-redux";
//import { decrement, increment } from "../../slices/homeSlice";

//Service
//import { useGetHomeQuery } from "../../services/home";

const HomePage: NextPage = () => {
  // const count = useSelector((state: RootState) => state.home.value);
  // const dispatch = useDispatch();

  // const { data, error, isLoading } = useGetHomeQuery("bulbasaur");

  return (
    <DashboardLayout title={"Somni Dashboard"}>
      {/*   <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div> */}
    </DashboardLayout>
  );
};

export default HomePage;
