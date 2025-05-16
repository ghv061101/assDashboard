import BarChartBox from "../../components/barChartBox/BarChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import TopBox from "../../components/topBox/TopBox";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>

      <div className="box box2">
        <ChartBox
          icon="/user.svg"
          title="Total Users"
          value="11,238+"
          percentage="+45%"
          duration="this month"
          link="/users"
          chartData={[10, 41, 35, 51, 49, 62, 69]}
        />
      </div>

      <div className="box box3">
        <ChartBox
          icon="/note.svg"
          title="Jobs"
          value="162+"
          percentage="+8%"
          duration="this month"
          link="/jobs"
          chartData={[5, 20, 28, 42, 30, 40, 55]}
        />
      </div>

      <div className="box box4"><BarChartBox/></div>

      <div className="box box5">
        <ChartBox
          icon="/order.svg"
          title="Active Ships"
          value="700+"
          percentage="+12%"
          duration="this month"
          link="/ships"
          chartData={[8, 16, 12, 25, 20, 22, 30]}
        />
      </div>

      <div className="box box6">
        <ChartBox
          icon="/product.svg"
          title="Products"
          value="420+"
          percentage="+18%"
          duration="this month"
          link="/products"
          chartData={[15, 22, 18, 24, 28, 30, 40]}
        />
      </div>

      <div className="box box7">Box 7</div>
      <div className="box box8">Box 8</div>
      <div className="box box9">Box 9</div>
    </div>
  );
};

export default Home;
