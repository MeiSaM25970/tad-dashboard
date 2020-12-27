import React from "react";

export const HeaderSetting = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-chart">
          {/* <div className="card-header card-header-rose" data-header-animation="true">
            <div className="ct-chart" id="websiteViewsChart"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" className="ct-chart-bar" style="width: 100%; height: 100%;"><g className="ct-grids"><line y1="120" y2="120" x1="40" x2="228.984375" className="ct-grid ct-vertical"></line><line y1="96" y2="96" x1="40" x2="228.984375" className="ct-grid ct-vertical"></line><line y1="72" y2="72" x1="40" x2="228.984375" className="ct-grid ct-vertical"></line><line y1="48" y2="48" x1="40" x2="228.984375" className="ct-grid ct-vertical"></line><line y1="24" y2="24" x1="40" x2="228.984375" className="ct-grid ct-vertical"></line><line y1="0" y2="0" x1="40" x2="228.984375" className="ct-grid ct-vertical"></line></g><g><g className="ct-series ct-series-a"><line x1="47.874348958333336" x2="47.874348958333336" y1="120" y2="54.959999999999994" className="ct-bar" ct:value="542" opacity="1"></line><line x1="63.623046875" x2="63.623046875" y1="120" y2="66.84" className="ct-bar" ct:value="443" opacity="1"></line><line x1="79.37174479166666" x2="79.37174479166666" y1="120" y2="81.6" className="ct-bar" ct:value="320" opacity="1"></line><line x1="95.12044270833333" x2="95.12044270833333" y1="120" y2="26.400000000000006" className="ct-bar" ct:value="780" opacity="1"></line><line x1="110.86914062499999" x2="110.86914062499999" y1="120" y2="53.64" className="ct-bar" ct:value="553" opacity="1"></line><line x1="126.61783854166666" x2="126.61783854166666" y1="120" y2="65.64" className="ct-bar" ct:value="453" opacity="1"></line><line x1="142.36653645833334" x2="142.36653645833334" y1="120" y2="80.88" className="ct-bar" ct:value="326" opacity="1"></line><line x1="158.115234375" x2="158.115234375" y1="120" y2="67.92" className="ct-bar" ct:value="434" opacity="1"></line><line x1="173.86393229166666" x2="173.86393229166666" y1="120" y2="51.84" className="ct-bar" ct:value="568" opacity="1"></line><line x1="189.61263020833334" x2="189.61263020833334" y1="120" y2="46.8" className="ct-bar" ct:value="610" opacity="1"></line><line x1="205.361328125" x2="205.361328125" y1="120" y2="29.28" className="ct-bar" ct:value="756" opacity="1"></line><line x1="221.11002604166666" x2="221.11002604166666" y1="120" y2="12.599999999999994" className="ct-bar" ct:value="895" opacity="1"></line></g></g><g className="ct-labels"><foreignObject style="overflow: visible;" x="40" y="125" width="15.748697916666666" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">J</span></foreignObject><foreignObject style="overflow: visible;" x="55.748697916666664" y="125" width="15.748697916666666" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">F</span></foreignObject><foreignObject style="overflow: visible;" x="71.49739583333333" y="125" width="15.748697916666668" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">M</span></foreignObject><foreignObject style="overflow: visible;" x="87.24609375" y="125" width="15.748697916666664" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">A</span></foreignObject><foreignObject style="overflow: visible;" x="102.99479166666666" y="125" width="15.748697916666664" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">M</span></foreignObject><foreignObject style="overflow: visible;" x="118.74348958333333" y="125" width="15.748697916666671" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">J</span></foreignObject><foreignObject style="overflow: visible;" x="134.4921875" y="125" width="15.748697916666657" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">J</span></foreignObject><foreignObject style="overflow: visible;" x="150.24088541666666" y="125" width="15.748697916666671" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">A</span></foreignObject><foreignObject style="overflow: visible;" x="165.98958333333331" y="125" width="15.748697916666671" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">S</span></foreignObject><foreignObject style="overflow: visible;" x="181.73828125" y="125" width="15.748697916666657" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">O</span></foreignObject><foreignObject style="overflow: visible;" x="197.48697916666666" y="125" width="15.748697916666657" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 16px; height: 20px;">N</span></foreignObject><foreignObject style="overflow: visible;" x="213.23567708333331" y="125" width="30" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 30px; height: 20px;">D</span></foreignObject><foreignObject style="overflow: visible;" y="96" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">0</span></foreignObject><foreignObject style="overflow: visible;" y="72" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">200</span></foreignObject><foreignObject style="overflow: visible;" y="48" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">400</span></foreignObject><foreignObject style="overflow: visible;" y="24" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">600</span></foreignObject><foreignObject style="overflow: visible;" y="0" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">800</span></foreignObject><foreignObject style="overflow: visible;" y="-30" x="0" height="30" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 30px; width: 30px;">1000</span></foreignObject></g></svg></div>
           */}
          {/* </div> */}
          <div className="card-body">
            <div className="card-actions">
              <button
                type="button"
                className="btn btn-danger btn-link fix-broken-card"
              >
                <i className="material-icons">build</i> Fix Header!
              </button>
              <button
                type="button"
                className="btn btn-info btn-link"
                rel="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Refresh"
              >
                <i className="material-icons">refresh</i>
              </button>
              <button
                type="button"
                className="btn btn-default btn-link"
                rel="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Change Date"
              >
                <i className="material-icons">edit</i>
              </button>
            </div>
            <h4 className="card-title">Website Views</h4>
            <p className="card-category">Last Campaign Performance</p>
          </div>
          <div className="card-footer">
            <div className="stats">
              <i className="material-icons">access_time</i> campaign sent 2 days
              ago
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-chart">
          {/* <div className="card-header card-header-success" data-header-animation="true">
            <div className="ct-chart" id="dailySalesChart"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" className="ct-chart-line" style="width: 100%; height: 100%;"><g className="ct-grids"><line x1="40" x2="40" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="67.71205357142857" x2="67.71205357142857" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="95.42410714285714" x2="95.42410714285714" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="123.13616071428572" x2="123.13616071428572" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="150.84821428571428" x2="150.84821428571428" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="178.56026785714286" x2="178.56026785714286" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="206.27232142857144" x2="206.27232142857144" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line y1="120" y2="120" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="96" y2="96" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="72" y2="72" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="48" y2="48" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="24" y2="24" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="0" y2="0" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line></g><g><g className="ct-series ct-series-a"><path d="M40,91.2C67.712,79.2,67.712,79.2,67.712,79.2C95.424,103.2,95.424,103.2,95.424,103.2C123.136,79.2,123.136,79.2,123.136,79.2C150.848,64.8,150.848,64.8,150.848,64.8C178.56,76.8,178.56,76.8,178.56,76.8C206.272,28.8,206.272,28.8,206.272,28.8" className="ct-line"></path><line x1="40" y1="91.2" x2="40.01" y2="91.2" className="ct-point" ct:value="12" opacity="1"></line><line x1="67.71205357142857" y1="79.2" x2="67.72205357142857" y2="79.2" className="ct-point" ct:value="17" opacity="1"></line><line x1="95.42410714285714" y1="103.2" x2="95.43410714285714" y2="103.2" className="ct-point" ct:value="7" opacity="1"></line><line x1="123.13616071428572" y1="79.2" x2="123.14616071428573" y2="79.2" className="ct-point" ct:value="17" opacity="1"></line><line x1="150.84821428571428" y1="64.8" x2="150.85821428571427" y2="64.8" className="ct-point" ct:value="23" opacity="1"></line><line x1="178.56026785714286" y1="76.8" x2="178.57026785714285" y2="76.8" className="ct-point" ct:value="18" opacity="1"></line><line x1="206.27232142857144" y1="28.799999999999997" x2="206.28232142857144" y2="28.799999999999997" className="ct-point" ct:value="38" opacity="1"></line></g></g><g className="ct-labels"><foreignObject style="overflow: visible;" x="40" y="125" width="27.712053571428573" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 28px; height: 20px;">M</span></foreignObject><foreignObject style="overflow: visible;" x="67.71205357142857" y="125" width="27.712053571428573" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 28px; height: 20px;">T</span></foreignObject><foreignObject style="overflow: visible;" x="95.42410714285714" y="125" width="27.712053571428577" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 28px; height: 20px;">W</span></foreignObject><foreignObject style="overflow: visible;" x="123.13616071428572" y="125" width="27.71205357142857" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 28px; height: 20px;">T</span></foreignObject><foreignObject style="overflow: visible;" x="150.84821428571428" y="125" width="27.71205357142857" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 28px; height: 20px;">F</span></foreignObject><foreignObject style="overflow: visible;" x="178.56026785714286" y="125" width="27.712053571428584" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 28px; height: 20px;">S</span></foreignObject><foreignObject style="overflow: visible;" x="206.27232142857144" y="125" width="30" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 30px; height: 20px;">S</span></foreignObject><foreignObject style="overflow: visible;" y="96" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">0</span></foreignObject><foreignObject style="overflow: visible;" y="72" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">10</span></foreignObject><foreignObject style="overflow: visible;" y="48" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">20</span></foreignObject><foreignObject style="overflow: visible;" y="24" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">30</span></foreignObject><foreignObject style="overflow: visible;" y="0" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">40</span></foreignObject><foreignObject style="overflow: visible;" y="-30" x="0" height="30" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 30px; width: 30px;">50</span></foreignObject></g></svg></div> */}
          {/* </div>  */}
          <div className="card-body">
            <div className="card-actions">
              <button
                type="button"
                className="btn btn-danger btn-link fix-broken-card"
              >
                <i className="material-icons">build</i> Fix Header!
              </button>
              <button
                type="button"
                className="btn btn-info btn-link"
                rel="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Refresh"
              >
                <i className="material-icons">refresh</i>
              </button>
              <button
                type="button"
                className="btn btn-default btn-link"
                rel="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Change Date"
              >
                <i className="material-icons">edit</i>
              </button>
            </div>
            <h4 className="card-title">Daily Sales</h4>
            <p className="card-category">
              <span className="text-success">
                <i className="fa fa-long-arrow-up"></i> 55%{" "}
              </span>{" "}
              increase in today sales.
            </p>
          </div>
          <div className="card-footer">
            <div className="stats">
              <i className="material-icons">access_time</i> updated 4 minutes
              ago
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-chart">
          {/* <div className="card-header card-header-info" data-header-animation="true">
            <div className="ct-chart" id="completedTasksChart"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" className="ct-chart-line" style="width: 100%; height: 100%;"><g className="ct-grids"><line x1="40" x2="40" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="64.248046875" x2="64.248046875" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="88.49609375" x2="88.49609375" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="112.744140625" x2="112.744140625" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="136.9921875" x2="136.9921875" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="161.240234375" x2="161.240234375" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="185.48828125" x2="185.48828125" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line x1="209.736328125" x2="209.736328125" y1="0" y2="120" className="ct-grid ct-horizontal"></line><line y1="120" y2="120" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="96" y2="96" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="72" y2="72" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="48" y2="48" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="24" y2="24" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line><line y1="0" y2="0" x1="40" x2="233.984375" className="ct-grid ct-vertical"></line></g><g><g className="ct-series ct-series-a"><path d="M40,92.4C64.248,30,64.248,30,64.248,30C88.496,66,88.496,66,88.496,66C112.744,84,112.744,84,112.744,84C136.992,86.4,136.992,86.4,136.992,86.4C161.24,91.2,161.24,91.2,161.24,91.2C185.488,96,185.488,96,185.488,96C209.736,97.2,209.736,97.2,209.736,97.2" className="ct-line"></path><line x1="40" y1="92.4" x2="40.01" y2="92.4" className="ct-point" ct:value="230" opacity="1"></line><line x1="64.248046875" y1="30" x2="64.258046875" y2="30" className="ct-point" ct:value="750" opacity="1"></line><line x1="88.49609375" y1="66" x2="88.50609375" y2="66" className="ct-point" ct:value="450" opacity="1"></line><line x1="112.744140625" y1="84" x2="112.754140625" y2="84" className="ct-point" ct:value="300" opacity="1"></line><line x1="136.9921875" y1="86.4" x2="137.0021875" y2="86.4" className="ct-point" ct:value="280" opacity="1"></line><line x1="161.240234375" y1="91.2" x2="161.250234375" y2="91.2" className="ct-point" ct:value="240" opacity="1"></line><line x1="185.48828125" y1="96" x2="185.49828125" y2="96" className="ct-point" ct:value="200" opacity="1"></line><line x1="209.736328125" y1="97.2" x2="209.746328125" y2="97.2" className="ct-point" ct:value="190" opacity="1"></line></g></g><g className="ct-labels"><foreignObject style="overflow: visible;" x="40" y="125" width="24.248046875" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 24px; height: 20px;">12p</span></foreignObject><foreignObject style="overflow: visible;" x="64.248046875" y="125" width="24.248046875" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 24px; height: 20px;">3p</span></foreignObject><foreignObject style="overflow: visible;" x="88.49609375" y="125" width="24.248046875" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 24px; height: 20px;">6p</span></foreignObject><foreignObject style="overflow: visible;" x="112.744140625" y="125" width="24.248046875" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 24px; height: 20px;">9p</span></foreignObject><foreignObject style="overflow: visible;" x="136.9921875" y="125" width="24.248046875" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 24px; height: 20px;">12p</span></foreignObject><foreignObject style="overflow: visible;" x="161.240234375" y="125" width="24.248046875" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 24px; height: 20px;">3a</span></foreignObject><foreignObject style="overflow: visible;" x="185.48828125" y="125" width="24.248046875" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 24px; height: 20px;">6a</span></foreignObject><foreignObject style="overflow: visible;" x="209.736328125" y="125" width="30" height="20"><span className="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 30px; height: 20px;">9a</span></foreignObject><foreignObject style="overflow: visible;" y="96" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">0</span></foreignObject><foreignObject style="overflow: visible;" y="72" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">200</span></foreignObject><foreignObject style="overflow: visible;" y="48" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">400</span></foreignObject><foreignObject style="overflow: visible;" y="24" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">600</span></foreignObject><foreignObject style="overflow: visible;" y="0" x="0" height="24" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">800</span></foreignObject><foreignObject style="overflow: visible;" y="-30" x="0" height="30" width="30"><span className="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 30px; width: 30px;">1000</span></foreignObject></g></svg></div>
          </div> */}
          <div className="card-body">
            <div className="card-actions">
              <button
                type="button"
                className="btn btn-danger btn-link fix-broken-card"
              >
                <i className="material-icons">build</i> Fix Header!
              </button>
              <button
                type="button"
                className="btn btn-info btn-link"
                rel="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Refresh"
              >
                <i className="material-icons">refresh</i>
              </button>
              <button
                type="button"
                className="btn btn-default btn-link"
                rel="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Change Date"
              >
                <i className="material-icons">edit</i>
              </button>
            </div>
            <h4 className="card-title">Completed Tasks</h4>
            <p className="card-category">Last Campaign Performance</p>
          </div>
          <div className="card-footer">
            <div className="stats">
              <i className="material-icons">access_time</i> campaign sent 2 days
              ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
