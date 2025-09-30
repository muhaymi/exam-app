import DashboardLayout from "../layouts/DashboardLayout";
import Buah from "../pages/game/Buah"; 

const GameWrapper: React.FC = () => {

    return (
        <DashboardLayout>
            <Buah /> 
        </DashboardLayout>
    );
};

export default GameWrapper;
