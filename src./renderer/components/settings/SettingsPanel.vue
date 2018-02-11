<script>
// import netRights from "./netRightsForm";
// import publishRights from "./publishRightsForm";
// import adaptRights from "./adaptRightsForm";
import setBackground from "./setBackground";

export default {
  functional: true,
  render(h, c) {
    const componentMap = {
      setBackground: setBackground
    };
    const Component = componentMap[c.props.path];
    return <Component />;
    // return <this.$route.query.subWorkType />;
  }
};
</script>